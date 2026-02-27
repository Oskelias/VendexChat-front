-- ============================================
-- VendexChat - Fix Orders Schema
-- This migration adds missing columns to 'orders' and 'order_items'
-- to align with the frontend catalog.ts payload.
-- ============================================

-- 1. Extend orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal numeric(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_delivery_cost numeric(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_zone text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_id uuid;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_notes text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_address text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}';

-- 2. Extend order_items table
-- (Fixing the 'create table if not exists' fail in 002)
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS price numeric(10,2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS subtotal numeric(10,2);

-- 3. Update RLS (Ensure anonymous orders are possible)
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);

-- 4. Create index for order_number for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders (order_number);
