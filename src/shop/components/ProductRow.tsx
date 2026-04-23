import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Product } from "../../types";
import { getProductImageUrl } from "../../utils/imageUrl";

interface ProductRowProps {
    product: Product;
    quantity: number;
    onAdd: (p: Product) => void;
    onUpdate: (id: string | number, quantity: number) => void;
}

export function ProductRow({ product, quantity, onAdd, onUpdate }: ProductRowProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-primary-dynamic transition-colors">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                {product.image_url && !imgError ? (
                    <img src={getProductImageUrl(product.image_url, 160)} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" width={160} height={160} onError={() => setImgError(true)} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-xl uppercase">{product.name.charAt(0)}</div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 leading-tight truncate">{product.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-1">{product.description}</p>
                <div className="font-bold text-primary-dynamic">${product.price.toLocaleString()}</div>
            </div>

            <div className="shrink-0">
                {quantity > 0 ? (
                    <div className="flex items-center gap-3 bg-slate-100 rounded-full px-2 py-1">
                        <button
                            onClick={() => onUpdate(product.id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold min-w-[20px] text-center">{quantity}</span>
                        <button
                            onClick={() => onUpdate(product.id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onAdd(product)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-dynamic text-white shadow-md active:scale-90 transition-transform"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div >
    );
}
