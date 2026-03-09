-- 027_retroactive_pro_trial.sql
-- 1. Update handle_new_user trigger to include 25-day PRO trial
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
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        role = EXCLUDED.role;

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
        ON CONFLICT (slug) DO NOTHING
        RETURNING id INTO new_store_id;

        -- If store already exists (conflict), try to find it
        IF new_store_id IS NULL THEN
            SELECT id INTO new_store_id FROM public.stores WHERE slug = NEW.raw_user_meta_data->>'slug';
        END IF;

        -- Update profile with store_id
        IF new_store_id IS NOT NULL THEN
            UPDATE public.profiles SET store_id = new_store_id WHERE id = NEW.id;

            -- 3. Create Subscription: 25-day PRO trial
            INSERT INTO public.subscriptions (store_id, plan_type, status, current_period_end)
            VALUES (
                new_store_id,
                'pro',
                'trial',
                NOW() + INTERVAL '25 days'
            )
            ON CONFLICT (store_id) DO NOTHING;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Retroactively apply PRO trial to all stores WITHOUT a subscription
INSERT INTO public.subscriptions (store_id, plan_type, status, current_period_end)
SELECT id, 'pro', 'trial', NOW() + INTERVAL '25 days'
FROM public.stores
WHERE id NOT IN (SELECT store_id FROM public.subscriptions)
ON CONFLICT (store_id) DO NOTHING;

-- 3. Ensure all existing trials are at least 25 days from now (Optional, but ensures consistency)
-- UPDATE public.subscriptions 
-- SET current_period_end = GREATEST(current_period_end, NOW() + INTERVAL '25 days')
-- WHERE status = 'trial';
