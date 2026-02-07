// Backend API types (raw response from server)

export interface ApiProduct {
  id: string;
  title: string;
  description: string | null;
  price: number;
  offer_price: number | null;
  final_price: number;
  image_url: string | null;
  sort_order: number;
  category_id: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  sort_order: number;
}

export interface ApiCatalogResponse {
  store: Store;
  categories: ApiCategory[];
  products_by_category: Record<string, ApiProduct[]>;
}

// Normalized types (used by components)

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  offer_price: number | null;
  image_url: string | null;
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
  whatsapp: string;
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
