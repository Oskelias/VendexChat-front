-- 028_fix_subscriptions_schema.sql
-- This script fixes missing columns and outdated constraints in the subscriptions table.

-- 1. Add missing columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='subscriptions' AND column_name='billing_cycle') THEN
        ALTER TABLE public.subscriptions ADD COLUMN billing_cycle text DEFAULT 'monthly';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='subscriptions' AND column_name='current_period_start') THEN
        ALTER TABLE public.subscriptions ADD COLUMN current_period_start timestamptz DEFAULT now();
    END IF;
END $$;

-- 2. Update plan_type check constraint to include 'vip' and 'ultra'
-- First, drop the old constraint if it exists. PostgREST errors can happen if the constraint is violated or if it's missing types.
ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_plan_type_check;

-- Add the expanded constraint
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_plan_type_check 
    CHECK (plan_type IN ('free', 'pro', 'premium', 'vip', 'ultra'));

-- 3. Also update status check constraint just in case
ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_status_check;
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_status_check 
    CHECK (status IN ('active', 'past_due', 'canceled', 'trial'));

-- 4. Force schema cache reload (Critical for PostgREST)
-- This sends a signal to PostgREST to refresh its internal cache of the database schema.
NOTIFY pgrst, 'reload schema';
