-- ============================================
-- Popups: tabla + inclusión en get_catalog
-- La tabla popups no existía; el RPC tampoco los retornaba.
-- ============================================

-- 1. Crear tabla popups
CREATE TABLE IF NOT EXISTS popups (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id   uuid        NOT NULL REFERENCES stores (id) ON DELETE CASCADE,
  title      text        NOT NULL,
  message    text        NOT NULL,
  active     boolean     NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_popups_store ON popups (store_id);

-- 2. RLS
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- Lectura pública (los popups activos son parte del catálogo público)
CREATE POLICY "popups_public_read"
  ON popups FOR SELECT
  USING (true);

-- Escritura sólo para dueños autenticados de la tienda
CREATE POLICY "popups_owner_write"
  ON popups FOR ALL
  USING (
    store_id IN (
      SELECT id FROM stores
      WHERE auth.uid() IS NOT NULL
    )
  );

-- 3. Actualizar get_catalog para incluir popups dentro del objeto store
CREATE OR REPLACE FUNCTION get_catalog(p_identifier TEXT)
RETURNS JSON
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  WITH
  store_row AS (
    SELECT
      id, name, slug, logo_url, banner_url, description,
      whatsapp, phone, address, delivery_info, custom_domain,
      coupons_enabled, instagram, facebook, schedule,
      physical_schedule, online_schedule, primary_color,
      metadata, welcome_message, footer_message
    FROM stores
    WHERE slug = p_identifier OR custom_domain = p_identifier
    LIMIT 1
  ),
  store_popups AS (
    SELECT
      COALESCE(
        json_agg(
          json_build_object(
            'id',      p.id,
            'title',   p.title,
            'message', p.message,
            'active',  p.active
          )
          ORDER BY p.created_at
        ) FILTER (WHERE p.id IS NOT NULL),
        '[]'::json
      ) AS popups
    FROM popups p
    WHERE p.store_id = (SELECT id FROM store_row)
  ),
  -- Un solo JOIN: todas las categorías + todos sus productos activos en una pasada
  cat_products AS (
    SELECT
      c.id           AS cat_id,
      c.name         AS cat_name,
      c.sort_order   AS cat_sort,
      p.id           AS prod_id,
      p.name,
      p.description,
      COALESCE(p.offer_price, p.price) AS price,
      p.offer_price,
      p.image_url,
      p.sort_order   AS prod_sort,
      p.category_id,
      p.stock,
      COALESCE(p.unlimited_stock, false) AS unlimited_stock,
      p.is_active
    FROM categories c
    LEFT JOIN products p
      ON p.category_id = c.id AND p.is_active = true
    WHERE c.store_id = (SELECT id FROM store_row)
  ),
  catalog_cats AS (
    SELECT
      cat_id        AS id,
      cat_name      AS name,
      cat_sort      AS sort_order,
      COALESCE(
        json_agg(
          json_build_object(
            'id',              prod_id,
            'name',            name,
            'description',     description,
            'price',           price,
            'offer_price',     offer_price,
            'image_url',       image_url,
            'sort_order',      prod_sort,
            'category_id',     category_id,
            'stock',           stock,
            'unlimited_stock', unlimited_stock,
            'is_active',       is_active
          ) ORDER BY prod_sort
        ) FILTER (WHERE prod_id IS NOT NULL),
        '[]'::json
      ) AS products
    FROM cat_products
    GROUP BY cat_id, cat_name, cat_sort
  )
  SELECT json_build_object(
    'store',           (
                         SELECT row_to_json(s)::jsonb || jsonb_build_object('popups', (SELECT popups FROM store_popups))
                         FROM store_row s
                       ),
    'categories',      COALESCE(
                         (SELECT json_agg(c ORDER BY c.sort_order) FROM catalog_cats c),
                         '[]'::json
                       ),
    'global_settings', '{}'::json
  );
$$;

GRANT EXECUTE ON FUNCTION get_catalog(TEXT) TO anon, authenticated;
