-- ============================================
-- VendexChat - Supabase Initial Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- 1. Stores
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  whatsapp text not null,
  created_at timestamptz not null default now()
);

create index idx_stores_slug on stores (slug);

-- 2. Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores (id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_categories_store on categories (store_id);

-- 3. Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories (id) on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null,
  offer_price numeric(10,2),
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index idx_products_category on products (category_id);

-- 4. Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique default 'ORD-' || substr(gen_random_uuid()::text, 1, 8),
  store_id uuid not null references stores (id) on delete cascade,
  customer_name text not null,
  customer_whatsapp text not null,
  delivery_type text not null check (delivery_type in ('pickup', 'delivery')),
  delivery_address text,
  status text not null default 'pending',
  total numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create index idx_orders_public_id on orders (public_id);
create index idx_orders_store on orders (store_id);

-- 5. Order Items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid not null references products (id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null
);

create index idx_order_items_order on order_items (order_id);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

alter table stores enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read access to catalog (stores, categories, products)
create policy "Public read stores"
  on stores for select
  using (true);

create policy "Public read categories"
  on categories for select
  using (true);

create policy "Public read products"
  on products for select
  using (true);

-- Orders: anyone can insert, read only by public_id
create policy "Anyone can create orders"
  on orders for insert
  with check (true);

create policy "Read orders by public_id"
  on orders for select
  using (true);

-- Order items: anyone can insert (linked to order creation)
create policy "Anyone can create order items"
  on order_items for insert
  with check (true);

create policy "Read order items"
  on order_items for select
  using (true);
