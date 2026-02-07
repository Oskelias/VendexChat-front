import { useState, useEffect } from "react";
import { fetchCatalog } from "../api/catalog";
import type { CatalogResponse } from "../types";

export function useCatalog(slug: string | undefined) {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      console.warn("[useCatalog] No slug provided, skipping fetch");
      setLoading(false);
      setError("No store slug provided");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const url = `${import.meta.env.VITE_API_URL || "https://api.vendexchat.app"}/public/store/${slug}/catalog`;
    console.log("[useCatalog] Fetching catalog:", url);

    fetchCatalog(slug)
      .then((res) => {
        if (!cancelled) {
          console.log("[useCatalog] Catalog loaded:", { store: res?.store?.name, categories: res?.categories?.length });
          setData(res);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[useCatalog] Fetch error:", err);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
}
