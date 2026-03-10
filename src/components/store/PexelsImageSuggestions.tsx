import { useState } from "react";
import { X, Image, AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";

interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
    large: string;
    original: string;
  };
  alt: string;
  photographer: string;
}

interface Props {
  productName: string;
  onSelect: (imageUrl: string) => void;
  onClose: () => void;
}

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;

export function PexelsImageSuggestions({ productName, onSelect, onClose }: Props) {
  const [query, setQuery] = useState(productName);
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const search = async () => {
    if (!PEXELS_API_KEY) {
      setError("API key de Pexels no configurada.");
      return;
    }
    setLoading(true);
    setError(null);
    setPhotos([]);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=4&orientation=landscape`,
        { headers: { Authorization: PEXELS_API_KEY } }
      );
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setPhotos(data.photos ?? []);
      if ((data.photos ?? []).length === 0) setError("No se encontraron imágenes.");
    } catch {
      setError("Error al cargar imágenes. Reintentá más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selected) onSelect(selected);
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
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Sugerencias de IA</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Búsqueda profesional con Pexels
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-8 py-5 border-b border-slate-100 flex gap-3">
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
            onClick={search}
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>

        {/* Image grid */}
        <div className="px-8 py-6 min-h-[260px]">
          {loading && (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 text-rose-400">
              <AlertCircle className="w-8 h-8" />
              <p className="text-xs font-black uppercase tracking-widest">{error}</p>
              <button
                onClick={search}
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
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => {
                const isSelected = selected === photo.src.large;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setSelected(isSelected ? null : photo.src.large)}
                    className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition-all group ${
                      isSelected
                        ? "border-indigo-500 shadow-lg shadow-indigo-200 scale-[1.02]"
                        : "border-transparent hover:border-slate-200"
                    }`}
                  >
                    <img
                      src={photo.src.medium}
                      alt={photo.alt || productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                        <div className="bg-indigo-600 text-white rounded-full p-1.5 shadow-lg">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white/80 font-bold truncate">📷 {photo.photographer}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Potenciado por{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Pexels
            </a>{" "}
            · Fotos gratuitas
          </p>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            Usar esta imagen
          </button>
        </div>
      </div>
    </div>
  );
}
