import { useState } from "react";
import { X, Image, AlertCircle, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { updateProductImageUrl } from "@/api/catalog";

interface ResultPhoto {
  id: string;
  thumb: string;  // para mostrar en la grilla
  full: string;   // URL que se guarda
  credit?: string;
}

interface Props {
  productName: string;
  /** Si se provee, guarda la imagen en Supabase al confirmar */
  productId?: string;
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

const PEXELS_API_KEY   = import.meta.env.VITE_PEXELS_API_KEY   as string | undefined;
const GOOGLE_API_KEY   = import.meta.env.VITE_GOOGLE_API_KEY   as string | undefined;
const GOOGLE_CX        = import.meta.env.VITE_GOOGLE_CX        as string | undefined;

type Source = "pexels" | "google";

/** Limpia números, unidades y traduce términos comunes al inglés para mejorar resultados en Pexels */
function buildPexelsQuery(raw: string): string {
  const unitPattern = /\b\d+(\.\d+)?\s*(cc|ml|l|lt|g|gr|kg|mg|oz|lb|latas?|botellas?|paquetes?|unidades?|u|x\d+)\b/gi;
  let q = raw
    .replace(unitPattern, "")
    .replace(/\b\d+\b/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const dict: Record<string, string> = {
    cerveza: "beer", gaseosa: "soda", agua: "water", jugo: "juice", vino: "wine",
    leche: "milk", cafe: "coffee", café: "coffee", mate: "yerba mate",
    pan: "bread", queso: "cheese", yogur: "yogurt", yogurt: "yogurt",
    pollo: "chicken", carne: "meat", pescado: "fish", arroz: "rice",
    pasta: "pasta", fideos: "noodles", aceite: "oil", azucar: "sugar",
    azúcar: "sugar", sal: "salt", harina: "flour", chocolate: "chocolate",
    galletitas: "cookies", galletas: "cookies", manteca: "butter",
    crema: "cream", helado: "ice cream", dulce: "jam", mermelada: "jam",
    mayonesa: "mayonnaise", ketchup: "ketchup", salsa: "sauce",
    tomate: "tomato", papa: "potato", papas: "potatoes",
    zanahoria: "carrot", cebolla: "onion", manzana: "apple",
    banana: "banana", naranja: "orange", limón: "lemon", limon: "lemon",
    frutilla: "strawberry", uva: "grape", pera: "pear", durazno: "peach",
    lata: "can", botella: "bottle", paquete: "package",
  };

  const translated = q
    .toLowerCase()
    .split(/\s+/)
    .map((w) => dict[w] ?? w)
    .join(" ")
    .trim();

  return translated || raw;
}

async function searchPexels(query: string): Promise<ResultPhoto[]> {
  if (!PEXELS_API_KEY) throw new Error("API key de Pexels no configurada.");
  const pexelsQuery = buildPexelsQuery(query);
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(pexelsQuery)}&per_page=6&orientation=landscape`,
    { headers: { Authorization: PEXELS_API_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels error ${res.status}`);
  const data = await res.json();
  return (data.photos ?? []).map((p: any) => ({
    id: String(p.id),
    thumb: p.src.medium,
    full: p.src.large,
    credit: p.photographer,
  }));
}

async function searchGoogle(query: string): Promise<ResultPhoto[]> {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) throw new Error("API key de Google no configurada.");
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", GOOGLE_API_KEY);
  url.searchParams.set("cx", GOOGLE_CX);
  url.searchParams.set("q", query);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", "6");
  url.searchParams.set("imgSize", "large");
  url.searchParams.set("safe", "active");
  const res = await fetch(url.toString());
  if (!res.ok) {
    let msg = `Google error ${res.status}`;
    try {
      const errData = await res.json();
      if (errData?.error?.message) msg = errData.error.message;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  const data = await res.json();
  return (data.items ?? []).map((item: any, i: number) => ({
    id: `g-${i}-${item.link}`,
    thumb: item.image?.thumbnailLink ?? item.link,
    full: item.link,
    credit: item.displayLink,
  }));
}

export function PexelsImageSuggestions({ productName, productId, onSelect, onClose }: Props) {
  const [source, setSource]   = useState<Source>("pexels");
  const [query, setQuery]     = useState(productName);
  const [photos, setPhotos]   = useState<ResultPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const search = async (overrideSource?: Source) => {
    const src = overrideSource ?? source;
    setLoading(true);
    setError(null);
    setPhotos([]);
    setSelected(null);
    setUsedFallback(false);
    try {
      if (src === "google") {
        try {
          const results = await searchGoogle(query);
          setPhotos(results);
          if (results.length === 0) setError("No se encontraron imágenes.");
        } catch (googleErr: any) {
          // Fallback a Pexels si Google falla
          const pexelsResults = await searchPexels(query);
          setPhotos(pexelsResults);
          setUsedFallback(true);
          if (pexelsResults.length === 0) setError("No se encontraron imágenes.");
        }
      } else {
        const results = await searchPexels(query);
        setPhotos(results);
        if (results.length === 0) setError("No se encontraron imágenes.");
      }
    } catch (e: any) {
      setError(e.message ?? "Error al cargar imágenes. Reintentá más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const switchSource = (s: Source) => {
    setSource(s);
    setPhotos([]);
    setSelected(null);
    setError(null);
  };

  const handleConfirm = async () => {
    if (!selected) return;
    if (productId) {
      setSaving(true);
      setError(null);
      try {
        await updateProductImageUrl(productId, selected);
      } catch {
        setError("No se pudo guardar la imagen. Reintentá.");
        setSaving(false);
        return;
      }
      setSaving(false);
    }
    onSelect(selected);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">

        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-6 border-b border-slate-100">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <Image className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Sugerencias de imágenes</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Búsqueda profesional de fotos
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source toggle */}
        <div className="px-8 pt-4 flex gap-2">
          <button
            onClick={() => switchSource("pexels")}
            className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              source === "pexels"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            Pexels
          </button>
          <button
            onClick={() => switchSource("google")}
            className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              source === "google"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            Google Images
          </button>
        </div>

        {/* Search bar */}
        <div className="px-8 py-4 border-b border-slate-100 flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-2xl px-5 border border-slate-200">
            <Image className="w-4 h-4 text-slate-300 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              className="flex-1 bg-transparent py-3 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300 uppercase tracking-wide"
              placeholder="Nombre del producto..."
            />
          </div>
          <button
            onClick={() => search()}
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>

        {/* Image grid */}
        <div className="px-8 py-6 min-h-[260px]">
          {loading && (
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-rose-400">
              <AlertCircle className="w-8 h-8" />
              <p className="text-xs font-black uppercase tracking-widest text-center">{error}</p>
              <button
                onClick={() => search()}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reintentar
              </button>
            </div>
          )}

          {!loading && !error && photos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-slate-300">
              <Image className="w-10 h-10" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Presioná Buscar para ver sugerencias
              </p>
            </div>
          )}

          {!loading && photos.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo) => {
                const isSelected = selected === photo.full;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setSelected(isSelected ? null : photo.full)}
                    className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all group ${
                      isSelected
                        ? "border-indigo-500 shadow-lg shadow-indigo-200 scale-[1.02]"
                        : "border-transparent hover:border-slate-200"
                    }`}
                  >
                    <img
                      src={photo.thumb}
                      alt={productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                        <div className="bg-indigo-600 text-white rounded-full p-1.5 shadow-lg">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                    {photo.credit && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[9px] text-white/80 font-bold truncate">{photo.credit}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {source === "google" && !usedFallback ? (
              <>Imágenes via Google Custom Search</>
            ) : usedFallback ? (
              <span className="text-amber-400">Google no disponible · Mostrando resultados de Pexels</span>
            ) : (
              <>
                Potenciado por{" "}
                <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-600 transition-colors">
                  Pexels
                </a>
                {" "}· Fotos gratuitas
              </>
            )}
          </p>
          <button
            onClick={handleConfirm}
            disabled={!selected || saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {saving ? "Guardando..." : "Usar esta imagen"}
          </button>
        </div>
      </div>
    </div>
  );
}
