-- ========================================================
-- SYNC STORE METADATA TO AUTH USERS
-- ========================================================

-- Trigger to keep slug and name in sync between stores and auth.users metadata
CREATE OR REPLACE FUNCTION public.sync_store_metadata_to_auth()
RETURNS TRIGGER AS $$
BEGIN
    -- If slug or name changes, and there is an owner assigned
    IF (OLD.slug IS DISTINCT FROM NEW.slug OR OLD.name IS DISTINCT FROM NEW.name) AND NEW.owner_id IS NOT NULL THEN
        UPDATE auth.users
        SET raw_user_meta_data = raw_user_meta_data || 
            jsonb_build_object(
                'slug', NEW.slug,
                'name', NEW.name
            )
        WHERE id = NEW.owner_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS tr_sync_store_metadata_to_auth ON public.stores;
CREATE TRIGGER tr_sync_store_metadata_to_auth
    AFTER UPDATE OF slug, name ON public.stores
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_store_metadata_to_auth();

-- Optional: Run once to sync existing stores if needed
-- UPDATE public.stores SET slug = slug WHERE owner_id IS NOT NULL;
