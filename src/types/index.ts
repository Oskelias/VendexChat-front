// Types used by components

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  offer_price: number | null;
  image_url: string | null;
  stock: number;
  unlimited_stock: boolean;
  is_active: boolean;
  category_id: string;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  products?: Product[];
  items?: Product[];
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url?: string | null;
  description?: string | null;
  whatsapp: string;
  phone?: string | null;
  address?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  schedule?: any | null;
  physical_schedule?: any | null;
  online_schedule?: any | null;
  delivery_info?: string | null;
  custom_domain?: string | null;
  coupons_enabled: boolean;
  primary_color: string;
}

export interface CatalogResponse {
  store: Store;
  categories: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryType = "pickup" | "delivery";

export interface OrderPayload {
  store_id: string;
  customer_name: string;
  customer_whatsapp: string;
  delivery_type: DeliveryType;
  delivery_address?: string;
  items: { product_id: string; quantity: number }[];
}

export interface OrderResponse {
  public_id: string;
  status: string;
  total: number;
}
