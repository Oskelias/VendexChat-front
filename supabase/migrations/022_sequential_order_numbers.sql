-- 1. Create a sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 1;

-- 2. Create the function to format and set the order number
CREATE OR REPLACE FUNCTION public.set_sequential_order_number()
RETURNS TRIGGER AS $$
BEGIN
    -- Only set if order_number is null or contains 'ORD-' (legacy format)
    IF NEW.order_number IS NULL OR NEW.order_number LIKE 'ORD-%' THEN
        NEW.order_number := LPAD(nextval('public.order_number_seq')::text, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Create the trigger
DROP TRIGGER IF EXISTS tr_set_sequential_order_number ON public.orders;
CREATE TRIGGER tr_set_sequential_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.set_sequential_order_number();
