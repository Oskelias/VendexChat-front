-- ============================================
-- VendexChat - Admin Schema Extensions
-- Run this in the Supabase SQL Editor
-- AFTER 001_initial_schema.sql
-- ============================================

-- ============================================
-- 1. Profiles table (links auth.users to stores)
-- ============================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  role text not null default 'client' check (role in ('client', 'superadmin')),
  store_id uuid references stores(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- 2. Extend stores table
-- ============================================
alter table stores add column if not exists owner_id uuid references auth.users(id);
alter table stores add column if not exists description text;
alter table stores add column if not exists email text;
alter table stores add column if not exists address text;
alter table stores add column if not exists instagram text;
alter table stores add column if not exists facebook text;
alter table stores add column if not exists accept_orders boolean not null default true;
alter table stores add column if not exists primary_color text not null default '#10b981';
alter table stores add column if not exists welcome_message text;
alter table stores add column if not exists footer_message text;
alter table stores add column if not exists min_order numeric(10,2) not null default 0;
alter table stores add column if not exists delivery_cost numeric(10,2) not null default 0;
alter table stores add column if not exists schedule jsonb;
alter table stores add column if not exists is_active boolean not null default true;

-- ============================================
-- 3. Extend products table
-- ============================================

-- Rename 'title' to 'name' (idempotent)
do $$ begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'products' and column_name = 'title'
  ) then
    alter table products rename column title to name;
  end if;
end $$;

alter table products add column if not exists store_id uuid references stores(id) on delete cascade;
alter table products add column if not exists stock integer not null default 0;
alter table products add column if not exists unlimited_stock boolean not null default false;
alter table products add column if not exists is_active boolean not null default true;
alter table products add column if not exists is_featured boolean not null default false;

-- Populate store_id from category's store
update products p
set store_id = c.store_id
from categories c
where p.category_id = c.id and p.store_id is null;

create index if not exists idx_products_store on products (store_id);

-- ============================================
-- 4. Extend orders table
-- ============================================
alter table orders add column if not exists customer_notes text;
alter table orders add column if not exists subtotal numeric(10,2) not null default 0;
alter table orders add column if not exists order_delivery_cost numeric(10,2) not null default 0;
alter table orders add column if not exists updated_at timestamptz not null default now();

-- ============================================
-- 5. Helper functions for RLS
-- ============================================
create or replace function public.is_superadmin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'superadmin'
  );
$$ language sql security definer stable;

create or replace function public.my_store_id()
returns uuid as $$
  select store_id from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- ============================================
-- 6. RLS Policies for profiles
-- ============================================
create policy "Users can read own profile"
  on profiles for select to authenticated
  using (id = auth.uid() or is_superadmin());

create policy "Users can update own profile"
  on profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "System can insert profiles"
  on profiles for insert
  with check (true);

-- ============================================
-- 7. RLS Policies for stores (authenticated write)
-- ============================================
create policy "Owner can update own store"
  on stores for update to authenticated
  using (owner_id = auth.uid() or is_superadmin())
  with check (owner_id = auth.uid() or is_superadmin());

create policy "Authenticated can insert stores"
  on stores for insert to authenticated
  with check (owner_id = auth.uid() or is_superadmin());

create policy "Superadmin can delete stores"
  on stores for delete to authenticated
  using (is_superadmin());

-- ============================================
-- 8. RLS Policies for categories (authenticated write)
-- ============================================
create policy "Owner can insert categories"
  on categories for insert to authenticated
  with check (store_id = my_store_id() or is_superadmin());

create policy "Owner can update categories"
  on categories for update to authenticated
  using (store_id = my_store_id() or is_superadmin())
  with check (store_id = my_store_id() or is_superadmin());

create policy "Owner can delete categories"
  on categories for delete to authenticated
  using (store_id = my_store_id() or is_superadmin());

-- ============================================
-- 9. RLS Policies for products (authenticated write)
-- ============================================
create policy "Owner can insert products"
  on products for insert to authenticated
  with check (store_id = my_store_id() or is_superadmin());

create policy "Owner can update products"
  on products for update to authenticated
  using (store_id = my_store_id() or is_superadmin())
  with check (store_id = my_store_id() or is_superadmin());

create policy "Owner can delete products"
  on products for delete to authenticated
  using (store_id = my_store_id() or is_superadmin());

-- ============================================
-- 10. RLS Policies for orders (authenticated update)
-- ============================================
create policy "Owner can update orders"
  on orders for update to authenticated
  using (store_id = my_store_id() or is_superadmin())
  with check (store_id = my_store_id() or is_superadmin());
