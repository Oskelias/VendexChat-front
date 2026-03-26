import { Plus, Minus } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/format";

interface ProductRowProps {
    product: Product;
    quantity: number;
    onAdd: (p: Product) => void;
    onUpdate: (id: string | number, quantity: number) => void;
    currency?: string;
}

export function ProductRow({ product, quantity, onAdd, onUpdate, currency = 'ARS' }: ProductRowProps) {
    return (
        <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-primary-dynamic transition-colors">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">N/A</div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 leading-tight truncate">{product.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-1">{product.description}</p>
                <div className="font-bold text-primary-dynamic">{formatPrice(product.price, currency)}</div>
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
