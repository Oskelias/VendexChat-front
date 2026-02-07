import { useState, useEffect, useRef } from "react";
import { fetchCatalog } from "../api/catalog";
import type { CatalogResponse } from "../types";

export function useCatalog(slug: string | undefined) {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchIdRef = useRef(0);

  useEffect(() => {
    if (!slug) {
      console.warn("[useCatalog] No slug provided, skipping fetch");
      setLoading(false);
      setError("No store slug provided");
      return;
    }

    // Increment fetchId to invalidate any in-flight requests from previous renders
    // (fixes StrictMode double-mount and slug change races)
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);
    setData(null);

    console.log("[useCatalog] Fetching catalog for slug:", slug, "fetchId:", fetchId);

    fetchCatalog(slug)
      .then((res) => {
        if (fetchId !== fetchIdRef.current) {
          console.log("[useCatalog] Stale response ignored, fetchId:", fetchId);
          return;
        }
        console.log("[useCatalog] Catalog loaded:", {
          store: res?.store?.name,
          categories: res?.categories?.length ?? 0,
        });
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (fetchId !== fetchIdRef.current) return;
        console.error("[useCatalog] Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}
