import { ShoppingBag, ArrowRight } from "lucide-react";

interface CartBarProps {
    totalItems: number;
    totalPrice: number;
    onClick: () => void;
}

export function CartBar({ totalItems, totalPrice, onClick }: CartBarProps) {
    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md animate-in slide-in-from-bottom-10 fade-in duration-500">
            <button
                onClick={onClick}
                className="w-full bg-primary-dynamic text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl active:scale-[0.98] transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-white text-primary-dynamic text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary-dynamic">
                            {totalItems}
                        </span>
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">Tu pedido</p>
                        <p className="font-bold text-lg leading-tight">${totalPrice.toLocaleString()}</p>
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
