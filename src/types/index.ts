// Backend API types

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
  products?: Product[];
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
  categories?: Category[];
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
