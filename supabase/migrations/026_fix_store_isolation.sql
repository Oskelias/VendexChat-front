-- ========================================================
-- FIX STORE OWNERSHIP & ISOLATION
-- ========================================================

-- 1. Ensure owner_id is set based on email match if it's currently null
-- This helps recover ownership for existing stores
update public.stores s
set owner_id = p.id
from public.profiles p
where s.owner_id is null 
  and s.email is not null 
  and p.role = 'client'
  and exists (
    select 1 from auth.users u 
    where u.id = p.id and u.email = s.email
  );

-- 2. Update the handle_new_user trigger to be even more robust with owner_id
-- We already have 025_update_trial_duration_trigger.sql but let's make sure it's perfect.
-- (This is just a safety measure, the previous migration 025 is already good)

-- 3. Verify RLS for order access (Critical for data isolation)
-- Ensure that users can only see orders from stores they own
drop policy if exists "Owner can view own store orders" on orders;
create policy "Owner can view own store orders" on orders for select to authenticated 
using (store_id = my_store_id() or is_superadmin() or exists (
  select 1 from stores where id = orders.store_id and owner_id = auth.uid()
));

-- 4. Check that order_items are also protected
drop policy if exists "Owner can read order_items" on order_items;
create policy "Owner can read order_items" on order_items for select to authenticated 
using (exists (
  select 1 from orders o 
  where o.id = order_items.order_id 
  and (o.store_id = my_store_id() or is_superadmin() or exists (
    select 1 from stores s where s.id = o.store_id and s.owner_id = auth.uid()
  ))
));
