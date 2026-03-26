import { ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "../../utils/format";

interface CartBarProps {
    totalItems: number;
    totalPrice: number;
    onClick: () => void;
    currency?: string;
}

export function CartBar({ totalItems, totalPrice, onClick, currency = 'ARS' }: CartBarProps) {
    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 w-auto max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-10 fade-in duration-500">
            <button
                onClick={onClick}
                className="w-full bg-emerald-600 text-white rounded-2xl p-4 flex items-center gap-6 shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 active:scale-[0.98] transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-white text-emerald-700 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-600">
                            {totalItems}
                        </span>
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">Tu pedido</p>
                        <p className="font-bold text-lg leading-tight">{formatPrice(totalPrice, currency)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 font-bold">
                    Ver carrito
                    <ArrowRight className="w-5 h-5" />
                </div>
            </button>
        </div>
    );
}
