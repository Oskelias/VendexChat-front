-- ============================================
-- Phase 4: Billing & Integrations
-- ============================================

-- 1. Subscriptions Table
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  plan_type text not null check (plan_type in ('free', 'pro', 'premium')),
  status text not null check (status in ('active', 'past_due', 'canceled', 'trial')),
  billing_cycle text default 'monthly' check (billing_cycle in ('monthly', 'annual')),
  discount_percentage numeric default 0,
  is_manual boolean default false,
  internal_notes text,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

-- 2. Gateways Table (Encrypted store credentials)
create table if not exists gateways (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete cascade, -- null for master gateways
  provider text not null check (provider in ('stripe', 'mercadopago', 'paypal')),
  is_master boolean default false, -- true if it's the SaaS owner's gateway
  config jsonb not null default '{}', -- { public_key: '...', secret_key: '...' }
  is_active boolean default true,
  created_at timestamptz not null default now()
);

alter table gateways enable row level security;

-- 3. Policies
drop policy if exists "Superadmin can manage everything on subscriptions" on subscriptions;
create policy "Superadmin can manage everything on subscriptions" on subscriptions for all to authenticated using (is_superadmin());

drop policy if exists "Owner can view own subscription" on subscriptions;
create policy "Owner can view own subscription" on subscriptions for select to authenticated using (store_id = my_store_id());

drop policy if exists "Superadmin can manage everything on gateways" on gateways;
create policy "Superadmin can manage everything on gateways" on gateways for all to authenticated using (is_superadmin());

drop policy if exists "Owner can manage own gateway" on gateways;
create policy "Owner can manage own gateway" on gateways for all to authenticated using (store_id = my_store_id());
