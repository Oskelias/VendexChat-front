import { X, Plus, Minus, Bot } from "lucide-react";
import type { Product } from "../../types";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    quantity: number;
    onAdd: (p: Product) => void;
    onUpdate: (id: string | number, delta: number) => void;
    onAskAI?: (p: Product) => void;
}

export function ProductQuickViewModal({
    product,
    isOpen,
    onClose,
    quantity,
    onAdd,
    onUpdate,
    onAskAI,
}: QuickViewModalProps) {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

            <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[92vh] overflow-y-auto">
                    <div className="md:w-3/5 lg:w-2/3 min-h-[280px] md:min-h-[520px] bg-slate-100 overflow-hidden relative">
                        {product.image_url && (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        )}
                        
                    </div>

                    <div className="md:w-2/5 lg:w-1/3 p-6 flex flex-col">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h2>
                            <div className="text-2xl font-bold text-primary-dynamic mb-4">${product.price.toLocaleString()}</div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {product.description || "Sin descripción disponible."}
                            </p>

                            {onAskAI && (
                                <button
                                    onClick={() => onAskAI(product)}
                                    className="flex items-center gap-2 text-primary-dynamic bg-primary-dynamic/10 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-dynamic/20 transition-all mb-4"
                                >
                                    <Bot className="w-4 h-4" />
                                    Consultar con IA
                                </button>
                            )}
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            {quantity > 0 ? (
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-6 bg-slate-100 rounded-full px-4 py-2 flex-1 justify-center">
                                        <button
                                            onClick={() => onUpdate(product.id, -1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 transition-transform active:scale-90"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="text-lg font-bold min-w-[30px] text-center">{quantity}</span>
                                        <button
                                            onClick={() => onUpdate(product.id, 1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600 transition-transform active:scale-90"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onAdd(product)}
                                    className="w-full bg-primary-dynamic hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary-dynamic/20 transition-all active:scale-[0.98]"
                                >
                                    Agregar al pedido
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
