-- ============================================
-- RPC: get_catalog
-- Devuelve store + categorías + productos + announcement en UNA sola query.
-- Elimina el waterfall de 2 round-trips (store → categories+products)
-- reduciendo la carga inicial a 1 request HTTP a la DB.
-- ============================================

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
  catalog_cats AS (
    SELECT
      c.id,
      c.name,
      c.sort_order,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id',              p.id,
              'name',            p.name,
              'description',     p.description,
              'price',           COALESCE(p.offer_price, p.price),
              'offer_price',     p.offer_price,
              'image_url',       p.image_url,
              'sort_order',      p.sort_order,
              'category_id',     p.category_id,
              'stock',           p.stock,
              'unlimited_stock', COALESCE(p.unlimited_stock, false),
              'is_active',       p.is_active
            ) ORDER BY p.sort_order
          )
          FROM products p
          WHERE p.category_id = c.id AND p.is_active = true
        ),
        '[]'::json
      ) AS products
    FROM categories c
    WHERE c.store_id = (SELECT id FROM store_row)
  )
  SELECT json_build_object(
    'store',           (SELECT row_to_json(s) FROM store_row s),
    'categories',      COALESCE(
                         (SELECT json_agg(c ORDER BY c.sort_order) FROM catalog_cats c),
                         '[]'::json
                       ),
    'global_settings', '{}'::json
  );
$$;

-- Permitir acceso anónimo (catálogo es público)
GRANT EXECUTE ON FUNCTION get_catalog(TEXT) TO anon, authenticated;
