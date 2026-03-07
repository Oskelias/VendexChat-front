import { useState, useEffect } from "react";
import { fetchMockCatalog } from "../data/mockAdapter";
import { fetchFreshCatalog, fetchStorePreview, getCachedEntry } from "../../api/catalog";
import type { CatalogResponse, Store } from "../../types";

const USE_MOCK = false; // Switch manual para desarrollo

export function useShopData(slug: string | undefined) {
    const [data, setData] = useState<CatalogResponse | null>(null);
    const [storePreview, setStorePreview] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);
    const [slow, setSlow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const hostname = typeof window !== "undefined" ? window.location.hostname : "";
        const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
        const isMainDomain = hostname.endsWith("vendexchat.app");

        // Si no es el dominio principal ni local, usamos el hostname como identificador (Dominio Personalizado)
        const identifier = (isLocal || isMainDomain) ? slug : hostname;

        if (!identifier) {
            setLoading(false);
            return;
        }

        setError(null);

        // ── Stale-While-Revalidate ──────────────────────────────────────────────
        const cached = getCachedEntry(identifier);
        if (cached) {
            setData(cached.data);
            setLoading(false);
            setSlow(false);

            if (!cached.isStale) return;

            // Caché viejo: actualizar silenciosamente en background
            if (!USE_MOCK) {
                fetchFreshCatalog(identifier)
                    .then(fresh => setData(fresh))
                    .catch(() => { /* falla silenciosa: el usuario ya tiene datos */ });
            }
            return;
        }

        // ── Sin caché: carga progresiva ────────────────────────────────────────
        setLoading(true);
        setSlow(false);
        setStorePreview(null);

        if (USE_MOCK) {
            fetchMockCatalog(identifier)
                .then(res => { setData(res); setLoading(false); setSlow(false); })
                .catch(err => { setError(err instanceof Error ? err.message : String(err)); setLoading(false); setSlow(false); });
            return;
        }

        // Fase 1: query liviana a stores → muestra header real mientras carga el catálogo
        fetchStorePreview(identifier).then(preview => {
            if (preview) setStorePreview(preview);
        });

        // Mostrar aviso "tardando" a los 6 segundos
        const slowTimer = setTimeout(() => setSlow(true), 6_000);

        // Timeout de 90 segundos
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("LOAD_ERROR:timeout")), 90_000)
        );

        // Fase 2: catálogo completo con productos
        Promise.race([fetchFreshCatalog(identifier), timeoutPromise])
            .then(res => { setData(res); setLoading(false); setSlow(false); setStorePreview(null); })
            .catch(err => { setError(err instanceof Error ? err.message : String(err)); setLoading(false); setSlow(false); })
            .finally(() => clearTimeout(slowTimer));
    }, [slug]);

    return { data, loading, slow, error, storePreview };
}
