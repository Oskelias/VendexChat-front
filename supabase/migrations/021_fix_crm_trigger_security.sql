-- Re-define the CRM trigger function as SECURITY DEFINER
-- This allows guest users to trigger the update on the customers table
-- without needing broad RLS policies on the customers table itself.

CREATE OR REPLACE FUNCTION public.handle_new_order_for_crm()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.customers (store_id, name, whatsapp, address, total_orders, total_spent, last_order_at)
    VALUES (
        NEW.store_id, 
        NEW.customer_name, 
        NEW.customer_whatsapp, 
        NEW.customer_address, 
        1, 
        NEW.total, 
        NEW.created_at
    )
    ON CONFLICT (store_id, whatsapp) DO UPDATE SET
        total_orders = public.customers.total_orders + 1,
        total_spent = public.customers.total_spent + EXCLUDED.total_spent,
        last_order_at = EXCLUDED.last_order_at,
        name = EXCLUDED.name,
        address = EXCLUDED.address,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
