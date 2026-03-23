import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, ShoppingBag, Zap, UtensilsCrossed, Wine, BookOpen, X } from "lucide-react";
import { supabase } from "@/supabaseClient";

type StoreType = "hamburgueseria" | "bebidas" | "libreria";

const STORES: { id: StoreType; label: string; icon: React.ElementType; name: string; greeting: string; color: string }[] = [
    {
        id: "hamburgueseria",
        label: "Hamburguesería",
        icon: UtensilsCrossed,
        name: "Don Bruno Burgers",
        greeting: `Hola! 👋 Bienvenido a Don Bruno Burgers. Preguntame lo que necesites sobre precios, horarios o promos. Si querés ver todo el menú, lo tenés en la tienda web.`,
        color: "bg-amber-500",
    },
    {
        id: "bebidas",
        label: "Vinoteca",
        icon: Wine,
        name: "La Vinoteca de Marta",
        greeting: `Hola! 🍷 Bienvenido a La Vinoteca de Marta. Consultame sobre precios, disponibilidad o promos. El catálogo completo está en la tienda web.`,
        color: "bg-purple-500",
    },
    {
        id: "libreria",
        label: "Librería",
        icon: BookOpen,
        name: "El Rincón del Saber",
        greeting: `Hola! 📚 Bienvenido a El Rincón del Saber. Preguntame sobre precios, horarios o promos. Todo el catálogo lo encontrás en la tienda web.`,
        color: "bg-emerald-500",
    },
];

const InteractiveAISection = () => {
    const [selectedStore, setSelectedStore] = useState<StoreType>("hamburgueseria");
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const currentStore = STORES.find(s => s.id === selectedStore)!;

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessages([{ role: "bot", text: currentStore.greeting }]);
        }, 300);
        return () => clearTimeout(timer);
    }, [selectedStore]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleStoreChange = (storeId: StoreType) => {
        if (storeId === selectedStore) return;
        setMessages([]);
        setUserInput("");
        setIsTyping(false);
        setSelectedStore(storeId);
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!userInput.trim() || isTyping) return;

        const newMsg = { role: "user", text: userInput };
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setUserInput("");
        setIsTyping(true);

        try {
            const { data, error } = await supabase.functions.invoke("demo-ai-chat", {
                body: {
                    storeType: selectedStore,
                    messages: updatedMessages.filter(m => m.role === "user" || m.role === "bot").map(m => ({
                        role: m.role,
                        text: m.text,
                    })),
                },
            });

            if (error) throw error;
            setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
        } catch {
            setMessages(prev => [...prev, { role: "bot", text: "Perdón, algo falló. Probá de nuevo en un momento." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section id="cliente" className="relative py-14 md:py-20 min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-emerald-950 overflow-hidden">
            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-primary-dynamic to-emerald-400" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center max-w-7xl mx-auto">
                    <div>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-up border border-emerald-500/30">
                            <Sparkles className="w-3 h-3" />
                            Experiencia Viva
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
                            Asistente IA que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-dynamic">ayuda a vender</span>
                        </h2>
                        <p className="text-lg text-violet-200 font-medium mb-12 max-w-xl">
                            Guía al cliente en el proceso de compra y resuelve sus dudas al instante.
                            <span className="text-white font-bold"> Sin que vos tengas que estar.</span>
                        </p>

                        {/* Store selector */}
                        <div className="mb-10">
                            <p className="text-xs font-black text-violet-300 uppercase tracking-widest mb-3">Elegí un rubro para probarlo:</p>
                            <div className="flex flex-wrap gap-3">
                                {STORES.map(store => (
                                    <button
                                        key={store.id}
                                        onClick={() => handleStoreChange(store.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                                            selectedStore === store.id
                                                ? "bg-violet-800 text-white border-violet-800 shadow-lg"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                                        }`}
                                    >
                                        <store.icon className="w-3.5 h-3.5" />
                                        {store.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { icon: Zap, title: "Respuestas al instante", text: "Menos de 2 segundos para responder cualquier duda de stock o precios." },
                                { icon: ShoppingBag, title: "Cierre de ventas", text: "La IA guía al usuario hasta el checkout, aumentando tu conversión." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-slate-300 group-hover:bg-primary-dynamic group-hover:text-white group-hover:border-transparent transition-all">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">{item.title}</h4>
                                        <p className="text-xs text-violet-300 font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Mobile: fullscreen overlay */}
                        {isOpen && (
                            <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
                                {/* Chat Header */}
                                <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-white flex-shrink-0">
                                    <div className={`w-10 h-10 rounded-full ${currentStore.color} flex items-center justify-center text-white transition-colors duration-300`}>
                                        <currentStore.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-black text-slate-900">{currentStore.name}</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asistente IA · En línea</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Chat Body */}
                                <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === 'user'
                                                ? 'bg-violet-700 text-white rounded-tr-none'
                                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start animate-pulse">
                                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-100" />
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-200" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Chat Input */}
                                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center flex-shrink-0">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Escribí algo..."
                                        className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-primary-dynamic transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="w-10 h-10 rounded-xl bg-primary-dynamic text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-dynamic/20"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Mobile: button to open chat */}
                        {!isOpen && (
                            <div className="flex justify-center py-8 lg:hidden">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="px-6 py-3 rounded-xl bg-primary-dynamic text-white text-sm font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-dynamic/20"
                                >
                                    Probar el asistente
                                </button>
                            </div>
                        )}

                        {/* Desktop: Device Mockup */}
                        <div className="hidden lg:block relative mx-auto w-full max-w-[400px] h-[600px] rounded-[3rem] bg-violet-900 p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-violet-700">
                            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white flex flex-col">
                                {/* Chat Header */}
                                <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-white">
                                    <div className={`w-10 h-10 rounded-full ${currentStore.color} flex items-center justify-center text-white transition-colors duration-300`}>
                                        <currentStore.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-black text-slate-900">{currentStore.name}</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asistente IA · En línea</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Body */}
                                <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === 'user'
                                                ? 'bg-violet-700 text-white rounded-tr-none'
                                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start animate-pulse">
                                            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-100" />
                                                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-200" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Chat Input */}
                                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Escribí algo..."
                                        className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-primary-dynamic transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="w-10 h-10 rounded-xl bg-primary-dynamic text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-dynamic/20"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveAISection;
