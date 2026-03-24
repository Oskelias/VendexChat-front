-- Add company_name column to customers table
-- Allows associating a customer with a company for B2B filtering

ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS company_name text NULL;
