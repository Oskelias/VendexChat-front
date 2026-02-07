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
      setLoading(false);
      setError("No store slug provided");
      return;
    }

    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);
    setData(null);

    fetchCatalog(slug)
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
