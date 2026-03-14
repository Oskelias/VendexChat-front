import { supabase } from "../lib/supabase";
import type { CatalogResponse, OrderPayload, OrderResponse } from "../types";

// localStorage persiste entre pestañas y recargas (a diferencia de sessionStorage)
const CATALOG_CACHE_TTL = 5 * 1000; // 5 segundos para desarrollo fluido
const CACHE_KEY_PREFIX = "vdx_catalog_";

export function getCachedEntry(identifier: string): { data: CatalogResponse; isStale: boolean } | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${identifier}`);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    return {
      data: cached.data,
      isStale: Date.now() - cached.timestamp > CATALOG_CACHE_TTL,
    };
  } catch {
    return null;
  }
}

function setCachedCatalog(identifier: string, data: CatalogResponse) {
  try {
    localStorage.setItem(`${CACHE_KEY_PREFIX}${identifier}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {
    // localStorage lleno, ignorar
  }
}

function processRpcResult(data: any): CatalogResponse {
  const { store, categories: rawCategories, global_settings: globalSettings } = data as {
    store: any;
    categories: any[];
    global_settings: Record<string, any>;
  };

  if (!store) throw new Error("Store not found");

  const storeMetadata = store.metadata || {};
  const isStoreAnnounceActive =
    storeMetadata.announcement_active === true || storeMetadata.announcement_active === "true";

  let announcement = null;
  if (isStoreAnnounceActive && storeMetadata.announcement_text) {
    announcement = storeMetadata.announcement_text;
  } else if (
    globalSettings?.global_announcement_active === "true" ||
    globalSettings?.global_announcement_active === true
  ) {
    announcement = globalSettings?.global_announcement_text ?? null;
  }

  const normalizedPopups = Array.isArray(store.popups)
    ? store.popups.map((popup: any) => ({
      ...popup,
      message: popup?.message ?? popup?.content ?? popup?.body ?? "",
      active:
        popup?.active === true ||
        popup?.active === "true" ||
        popup?.is_active === true ||
        popup?.is_active === "true",
    }))
    : [];

  const sortedCategories = (rawCategories ?? []).map(cat => ({
    ...cat,
    products: (cat.products || []).sort((a: any, b: any) => {
      // Primary sort: Manual sort_order from Admin
      const orderA = a.sort_order ?? 0;
      const orderB = b.sort_order ?? 0;
      if (orderA !== orderB) return orderA - orderB;

      // Secondary sort: Alphabetical by name
      return a.name.localeCompare(b.name);
    })
  }));

  return {
    store: {
      ...store,
      popups: normalizedPopups,
    },
    categories: sortedCategories,
    announcement,
  };
}

// Fetch liviano: solo info de la tienda (sin productos/categorías).
// Permite mostrar el header real mientras el catálogo completo carga.
export async function fetchStorePreview(identifier: string): Promise<import("../types").Store | null> {
  try {
    const { data, error } = await supabase
      .from("stores")
      .select("id,name,slug,logo_url,banner_url,description,whatsapp,phone,address,instagram,primary_color,metadata,custom_domain,delivery_cost,coupons_enabled,delivery_info,schedule,physical_schedule,online_schedule,facebook,ai_prompt,welcome_message,footer_message")
      .or(`slug.eq.${identifier},custom_domain.eq.${identifier}`)
      .limit(1)
      .single();
    if (error || !data) return null;
    return data as import("../types").Store;
  } catch {
    return null;
  }
}

// Llama a Supabase con hasta `maxAttempts` reintentos (útil para cold starts).
export async function fetchFreshCatalog(identifier: string, maxAttempts = 3): Promise<CatalogResponse> {
  let lastError: Error = new Error(`STORE_NOT_FOUND:${identifier}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await new Promise(r => setTimeout(r, attempt * 3_000)); // 3s, 6s
    }

    const { data, error } = await supabase.rpc("get_catalog", { p_identifier: identifier });

    if (!error && data) {
      try {
        const result = processRpcResult(data);
        setCachedCatalog(identifier, result);
        return result;
      } catch (e) {
        // processRpcResult lanzó → store genuinamente no existe en la DB
        lastError = new Error(`STORE_NOT_FOUND:${identifier}`);
        break; // no tiene sentido reintentar
      }
    }

    // Error de Supabase (timeout, conexión, función no encontrada, etc.)
    const supabaseMsg = (error as any)?.message || (error as any)?.details || String(error);
    lastError = new Error(`LOAD_ERROR:${supabaseMsg}`);
  }

  throw lastError;
}

export async function fetchCatalog(identifier: string): Promise<CatalogResponse> {
  const cached = getCachedEntry(identifier);
  if (cached && !cached.isStale) return cached.data;
  return fetchFreshCatalog(identifier);
}


export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  // 1. Look up prices and names for all items
  const productIds = payload.items.map((i) => i.product_id);
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id, price, offer_price, name")
    .in("id", productIds);

  if (prodError || !products) {
    throw new Error(`Failed to look up products: ${prodError?.message}`);
  }

  const productMap = new Map(
    products.map((p) => [p.id, { price: p.offer_price ?? p.price, name: p.name }])
  );

  // 2. Validate items
  if (payload.items.length === 0) {
    throw new Error("Cannot create an empty order");
  }

  // 3. Insert order
  const orderData = {
    store_id: payload.store_id,
    customer_name: payload.customer_name,
    customer_whatsapp: payload.customer_whatsapp,
    delivery_type: payload.delivery_type,
    delivery_address: payload.delivery_address || null,
    customer_address: payload.delivery_address || null, // Keeping both for compatibility
    customer_notes: payload.customer_notes || null,
    subtotal: payload.subtotal,
    order_delivery_cost: payload.delivery_cost,
    total: payload.total,
    status: 'pending',
    delivery_zone: payload.delivery_zone || null,
    payment_method: payload.payment_method || null,
    coupon_id: payload.coupon_id || null,
    metadata: { company_name: payload.customer_company || null }
  };

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(orderData)
    .select("id, public_id, status, total, order_number")
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message || 'Unknown error'}`);
  }

  // 4. Insert order items
  const orderItems = payload.items.map((item) => {
    const info = productMap.get(item.product_id);
    const price = info?.price ?? 0;
    const prodName = info?.name ?? "Producto";
    return {
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: price, // From initial schema
      price: price,      // From new schema
      name: prodName,
      subtotal: price * item.quantity,
    };
  });

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Failed to save order items:", itemsError.message);
    // Even if items fail, we have the order header
  }

  return {
    public_id: order.public_id,
    order_number: order.order_number || order.public_id,
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

  return {
    ...data,
    order_number: (data as any).order_number || data.public_id,
  };
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

export async function updateProductImageUrl(productId: string, imageUrl: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({ image_url: imageUrl })
    .eq("id", productId);

  if (error) throw new Error(`Error al actualizar imagen: ${error.message}`);
}

export async function getGlobalSettings(): Promise<Record<string, any>> {
  const { data, error } = await supabase.from('global_settings').select('*');
  if (error) {
    console.warn('[getGlobalSettings] Error fetching settings:', error);
    return {};
  }
  return (data || []).reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
}
