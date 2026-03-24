import { supabase } from "../lib/supabase";
import type { Customer } from "../types";

export interface CreateCustomerPayload {
  store_id: string;
  name: string;
  whatsapp: string;
  email?: string | null;
  address?: string | null;
  company_name?: string | null;
  notes?: string | null;
}

export interface UpdateCustomerPayload {
  name?: string;
  whatsapp?: string;
  email?: string | null;
  address?: string | null;
  company_name?: string | null;
  notes?: string | null;
  is_archived?: boolean;
}

export async function fetchCustomers(storeId: string): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("store_id", storeId)
    .order("last_order_at", { ascending: false, nullsFirst: false });

  if (error) throw new Error(`Error al cargar clientes: ${error.message}`);
  return (data ?? []) as Customer[];
}

export async function createCustomer(payload: CreateCustomerPayload): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert({
      store_id: payload.store_id,
      name: payload.name,
      whatsapp: payload.whatsapp,
      email: payload.email ?? null,
      address: payload.address ?? null,
      company_name: payload.company_name ?? null,
      notes: payload.notes ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear cliente: ${error.message}`);
  return data as Customer;
}

export async function updateCustomer(id: string, payload: UpdateCustomerPayload): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error al actualizar cliente: ${error.message}`);
  return data as Customer;
}

export interface CustomerOrder {
  id: string;
  public_id: string;
  order_number: string | null;
  status: string;
  total: number;
  created_at: string;
  metadata: { company_name?: string | null } | null;
}

export async function fetchCustomerOrders(customerId: string, storeId: string): Promise<CustomerOrder[]> {
  // Orders are linked to customers via whatsapp + store_id
  const { data: customer } = await supabase
    .from("customers")
    .select("whatsapp")
    .eq("id", customerId)
    .single();

  if (!customer) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("id, public_id, order_number, status, total, created_at, metadata")
    .eq("store_id", storeId)
    .eq("customer_whatsapp", customer.whatsapp)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al cargar pedidos: ${error.message}`);
  return (data ?? []) as CustomerOrder[];
}
