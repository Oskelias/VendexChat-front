import { supabase } from "../lib/supabase";
import type { CatalogResponse, OrderPayload, OrderResponse } from "../types";

export async function fetchCatalog(slug: string): Promise<CatalogResponse> {
  // 1. Get store by slug
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("id, name, slug, logo_url, whatsapp")
    .eq("slug", slug)
    .single();

  if (storeError || !store) {
    throw new Error(`Store not found: ${slug}`);
  }

  // 2. Get categories for this store
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, name, sort_order")
    .eq("store_id", store.id)
    .order("sort_order");

  if (catError) {
    throw new Error(`Failed to load categories: ${catError.message}`);
  }

  // 3. Get all products for these categories
  const categoryIds = (categories ?? []).map((c) => c.id);

  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id, name, description, price, offer_price, image_url, sort_order, category_id")
    .in("category_id", categoryIds)
    .order("sort_order");

  if (prodError) {
    throw new Error(`Failed to load products: ${prodError.message}`);
  }

  // 4. Group products by category and normalize
  const productsByCategory = new Map<string, typeof products>();
  for (const p of products ?? []) {
    const list = productsByCategory.get(p.category_id) ?? [];
    list.push(p);
    productsByCategory.set(p.category_id, list);
  }

  const normalizedCategories = (categories ?? []).map((cat) => {
    const catProducts = productsByCategory.get(cat.id) ?? [];
    return {
      id: cat.id,
      name: cat.name,
      products: catProducts.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.offer_price ?? p.price,
        offer_price: p.offer_price,
        image_url: p.image_url,
      })),
    };
  });

  return { store, categories: normalizedCategories };
}

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  // 1. Look up prices for all items
  const productIds = payload.items.map((i) => i.product_id);
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id, price, offer_price")
    .in("id", productIds);

  if (prodError || !products) {
    throw new Error(`Failed to look up products: ${prodError?.message}`);
  }

  const priceMap = new Map(
    products.map((p) => [p.id, p.offer_price ?? p.price])
  );

  // 2. Calculate total
  const total = payload.items.reduce((sum, item) => {
    const price = priceMap.get(item.product_id) ?? 0;
    return sum + price * item.quantity;
  }, 0);

  // 3. Insert order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      store_id: payload.store_id,
      customer_name: payload.customer_name,
      customer_whatsapp: payload.customer_whatsapp,
      delivery_type: payload.delivery_type,
      delivery_address: payload.delivery_address ?? null,
      total,
    })
    .select("id, public_id, status, total")
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message}`);
  }

  // 4. Insert order items
  const orderItems = payload.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: priceMap.get(item.product_id) ?? 0,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error(`Failed to save order items: ${itemsError.message}`);
  }

  return {
    public_id: order.public_id,
    status: order.status,
    total: order.total,
  };
}

export async function getOrder(publicId: string): Promise<OrderResponse> {
  const { data, error } = await supabase
    .from("orders")
    .select("public_id, status, total")
    .eq("public_id", publicId)
    .single();

  if (error || !data) {
    throw new Error(`Order not found: ${publicId}`);
  }

  return data;
}
