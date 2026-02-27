-- Add policy to allow anonymous inserts/updates on customers table
-- This is necessary because the trigger `on_order_created_crm` runs when a guest places an order.

DROP POLICY IF EXISTS "Anyone can insert customers" ON public.customers;
CREATE POLICY "Anyone can insert customers" ON public.customers
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update customers" ON public.customers;
CREATE POLICY "Anyone can update customers" ON public.customers
    FOR UPDATE USING (true) WITH CHECK (true);
