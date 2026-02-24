import { supabase } from "../lib/supabase";
import type { CatalogResponse, OrderPayload, OrderResponse } from "../types";

const CATALOG_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCachedCatalog(identifier: string): CatalogResponse | null {
  try {
    const raw = sessionStorage.getItem(`catalog_${identifier}`);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CATALOG_CACHE_TTL) {
      sessionStorage.removeItem(`catalog_${identifier}`);
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function setCachedCatalog(identifier: string, data: CatalogResponse) {
  try {
    sessionStorage.setItem(`catalog_${identifier}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // sessionStorage lleno, ignorar
  }
}

export async function fetchCatalog(identifier: string): Promise<CatalogResponse> {
  // Intentar servir desde caché
  const cached = getCachedCatalog(identifier);
  if (cached) return cached;

  // 1. Get store by slug OR custom_domain
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("id, name, slug, logo_url, banner_url, description, whatsapp, phone, address, delivery_info, custom_domain, coupons_enabled, instagram, facebook, schedule, physical_schedule, online_schedule, primary_color, metadata, welcome_message, footer_message")
    .or(`slug.eq.${identifier},custom_domain.eq.${identifier}`)
    .single();

  if (storeError || !store) {
    throw new Error(`Store not found for identifier: ${identifier}`);
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

  // 3. Get all products for these categories (Only active ones)
  const categoryIds = (categories ?? []).map((c) => c.id);

  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id, name, description, price, offer_price, image_url, sort_order, category_id, stock, unlimited_stock, is_active")
    .in("category_id", categoryIds)
    .eq("is_active", true)
    .order("sort_order");

  if (prodError) {
    throw new Error(`Failed to load products: ${prodError.message}`);
  }

  // 4. Group products by category and normalize
  const productsByCategory = new Map<string, any[]>();
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
        stock: p.stock,
        unlimited_stock: p.unlimited_stock,
        is_active: p.is_active,
        category_id: p.category_id,
        sort_order: p.sort_order
      })),
    };
  });

  // 5. Fetch global announcement
  const { data: globalSettings } = await supabase
    .from("global_settings")
    .select("key, value")
    .in("key", ["global_announcement_active", "global_announcement_text"]);

  const settingsMap = (globalSettings ?? []).reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, any>);

  const announcement = (settingsMap.global_announcement_active === "true" || settingsMap.global_announcement_active === true)
    ? settingsMap.global_announcement_text
    : null;

  const result = { store, categories: normalizedCategories, announcement };

  // Guardar en caché
  setCachedCatalog(identifier, result);

  return result;
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
      customer_notes: payload.customer_notes ?? null,
      total,
      metadata: {
        company_name: payload.customer_company ?? null
      }
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

export async function validateCoupon(code: string, storeId: string) {
  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("store_id", storeId)
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (error || !coupon) {
    throw new Error("Cupón inválido o inexistente");
  }

  // 1. Verificar vigencia
  const now = new Date();
  if (new Date(coupon.start_date) > now) {
    throw new Error("Este cupón aún no es válido");
  }
  if (coupon.end_date && new Date(coupon.end_date) < now) {
    throw new Error("Este cupón ha expirado");
  }

  // 2. Verificar límites de uso
  if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
    throw new Error("Este cupón ya alcanzó el límite de usos");
  }

  return coupon;
}
