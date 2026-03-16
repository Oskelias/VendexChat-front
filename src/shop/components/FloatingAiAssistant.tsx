import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import AssistantIcon from '../../components/icons/AssistantIcon';

interface FloatingAiAssistantProps {
    onClick: () => void;
    isOpen: boolean;
    isCartOpen?: boolean;
}

export default function FloatingAiAssistant({ onClick, isOpen, isCartOpen }: FloatingAiAssistantProps) {
    const [showBubble, setShowBubble] = useState(false);
    const [hasBounced, setHasBounced] = useState(false);

    useEffect(() => {
        // Mostrar burbuja proactiva después de 3 segundos
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowBubble(true);
                setHasBounced(true);
            }
        }, 3000);

        // Ocultar burbuja después de 8 segundos adicionales
        const hideTimer = setTimeout(() => {
            setShowBubble(false);
        }, 11000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, [isOpen]);

    if (isOpen || isCartOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 z-[55] flex flex-col items-end gap-3 pointer-events-none">
            {/* Mensaje Proactivo */}
            {showBubble && (
                <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-primary-dynamic/20 animate-in slide-in-from-right-4 fade-in duration-500 pointer-events-auto relative">
                    <button
                        onClick={() => setShowBubble(false)}
                        className="absolute -top-2 -left-2 bg-white rounded-full p-0.5 shadow-md border border-slate-100 text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs font-bold text-slate-700 leading-tight">
                        Hola! 👋 <br />
                        <span className="text-primary-dynamic">Necesitás una mano?</span>
                    </p>
                    <div className="absolute bottom-0 right-4 translate-y-1/2 w-3 h-3 bg-white border-r border-b border-primary-dynamic/20 rotate-45" />
                </div>
            )}

            {/* Botón Flotante */}
            <button
                onClick={onClick}
                className={`
                    group pointer-events-auto relative w-14 h-14 rounded-full overflow-hidden shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90
                    ${showBubble ? 'animate-float' : 'animate-pulse-subtle'}
                `}
            >
                <div className="absolute inset-0 rounded-full bg-primary-dynamic animate-ping opacity-20 group-hover:hidden" />
                <img
                    src="/iconoVendexchat.png"
                    alt="VendexChat"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] object-cover z-10"
                />

                {/* Indicador online */}
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white z-20" />
            </button>
        </div>
    );
}
