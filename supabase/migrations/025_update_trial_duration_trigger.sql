-- Update the trigger function that creates the initial subscription
-- (Assumes the function is named handle_new_user and handles subscription creation)
-- Check your existing trigger logic in Supabase and apply this logic:

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_store_id UUID;
BEGIN
    -- 1. Create Profile
    INSERT INTO public.profiles (id, name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'client')
    );

    -- 2. Create Store (if provided in metadata)
    IF NEW.raw_user_meta_data->>'slug' IS NOT NULL THEN
        INSERT INTO public.stores (owner_id, name, slug, country, city, whatsapp)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'name', 'Mi Tienda'),
            NEW.raw_user_meta_data->>'slug',
            COALESCE(NEW.raw_user_meta_data->>'country', ''),
            COALESCE(NEW.raw_user_meta_data->>'city', ''),
            COALESCE(NEW.raw_user_meta_data->>'whatsapp', '')
        )
        RETURNING id INTO new_store_id;

        -- Update profile with store_id
        UPDATE public.profiles SET store_id = new_store_id WHERE id = NEW.id;

        -- 3. Create Subscription: 25-day PRO trial
        INSERT INTO public.subscriptions (store_id, plan_type, status, current_period_end)
        VALUES (
            new_store_id,
            'pro',
            'trial',
            NOW() + INTERVAL '25 days'
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
