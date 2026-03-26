import { memo } from "react";
import { Plus, Minus } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/format";

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAdd: (p: Product) => void;
    onUpdate: (id: string, q: number) => void;
    currency?: string;
}

export const ProductCard = memo(function ProductCard({ product, quantity, onAdd, onUpdate, currency = 'ARS' }: ProductCardProps) {
    const hasOffer = product.offer_price !== null;
    const isOutOfStock = !product.unlimited_stock && product.stock <= 0;

    return (
        <div className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex h-28 md:h-32 ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}>
            {/* Image Thumbnail */}
            <div className="relative w-24 md:w-32 h-full flex-shrink-0 bg-slate-50 overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200 font-black text-xl md:text-2xl uppercase">
                        {product.name.charAt(0)}
                    </div>
                )}

                {hasOffer && (
                    <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-tighter shadow-sm z-10">
                        OFF
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-2 md:p-3 flex flex-col justify-between min-w-0">
                <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-[10px] md:text-sm line-clamp-2 leading-tight uppercase tracking-tight">
                        {product.name}
                    </h3>
                    <p className="text-[8px] md:text-[10px] text-slate-500 line-clamp-2 leading-tight">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-2 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs md:text-base font-black text-primary-dynamic tracking-tighter">
                            {formatPrice(hasOffer ? product.offer_price! : product.price, currency)}
                        </span>
                    </div>

                    {isOutOfStock ? (
                        <div className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Agotado</div>
                    ) : quantity > 0 ? (
                        <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg w-fit">
                            <button
                                onClick={(e) => { e.stopPropagation(); onUpdate(product.id, quantity - 1); }}
                                className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] md:text-xs font-black text-slate-900 w-4 text-center">{quantity}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); onUpdate(product.id, quantity + 1); }}
                                className="w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                            className="flex items-center gap-1 bg-white border border-primary-dynamic text-primary-dynamic px-2 py-1 rounded-lg w-fit group/btn hover:bg-primary-dynamic hover:text-white transition-all cursor-pointer shadow-sm"
                        >
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">- 0 +</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
