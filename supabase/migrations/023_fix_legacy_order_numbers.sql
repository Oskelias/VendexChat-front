-- Update existing orders that have null or legacy order numbers
-- This will assign them a sequential number starting from wherever the sequence is
UPDATE public.orders
SET order_number = LPAD(nextval('public.order_number_seq')::text, 4, '0')
WHERE order_number IS NULL OR order_number LIKE 'ORD-%';
