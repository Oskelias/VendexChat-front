import { useState, useEffect } from "react";
import { fetchMockCatalog } from "../data/mockAdapter";
import { fetchCatalog } from "../../api/catalog";
import type { CatalogResponse } from "../../types";

const USE_MOCK = false; // Switch manual para desarrollo

export function useShopData(slug: string | undefined) {
    const [data, setData] = useState<CatalogResponse | null>(null);
    const [loading, setLoading] = useState(true);
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

        setLoading(true);
        setError(null);

        const fetchId = identifier; // Para evitar race conditions si cambiara (aunque poco probable aquí)
        const fetchFn = USE_MOCK ? fetchMockCatalog : fetchCatalog;

        const TIMEOUT_MS = 12_000;
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Tiempo de espera agotado. Revisá tu conexión e intentá de nuevo.")), TIMEOUT_MS)
        );

        Promise.race([fetchFn(fetchId), timeoutPromise])
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : String(err));
                setLoading(false);
            });
    }, [slug]);

    return { data, loading, error };
}
