-- Create quick_responses table for AI assistant FAQ/predefined answers
CREATE TABLE quick_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_quick_responses_store_id ON quick_responses(store_id);

-- Enable RLS
ALTER TABLE quick_responses ENABLE ROW LEVEL SECURITY;

-- Public read policy - anyone can read (needed for visiting the store)
CREATE POLICY "Public can read quick_responses"
  ON quick_responses
  FOR SELECT
  USING (TRUE);

-- Authenticated users (store owner) can manage their own
CREATE POLICY "Store owner can manage quick_responses"
  ON quick_responses
  FOR ALL
  USING (auth.uid()::text = (SELECT auth.uid()::text FROM stores WHERE stores.id = quick_responses.store_id LIMIT 1))
  WITH CHECK (auth.uid()::text = (SELECT auth.uid()::text FROM stores WHERE stores.id = quick_responses.store_id LIMIT 1));
