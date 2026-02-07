import { useState, useEffect, useRef } from "react";
import { fetchCatalog } from "../api/catalog";
import type { CatalogResponse } from "../types";

export function useCatalog(slug: string | undefined) {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchIdRef = useRef(0);

  useEffect(() => {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : undefined;
    const isLocal =
      hostname === "localhost" || hostname === "127.0.0.1";
    const resolvedSlug = slug ?? (!isLocal ? hostname : undefined);

    if (!resolvedSlug) {
      console.warn("[useCatalog] No slug provided, skipping fetch");
      setLoading(false);
      setError("No store slug provided");
      return;
    }

    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);

    const url = `${import.meta.env.VITE_API_URL || "https://api.vendexchat.app"}/public/store/${resolvedSlug}/catalog`;
    console.log("[useCatalog] Fetching catalog:", url);

    fetchCatalog(resolvedSlug)
      .then((res) => {
        if (fetchId !== fetchIdRef.current) return;
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (fetchId !== fetchIdRef.current) return;
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return { data, loading, error };
}
