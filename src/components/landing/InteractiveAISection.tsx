import { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles, ShoppingBag, Zap } from "lucide-react";
import { supabase } from "@/supabaseClient";

const InteractiveAISection = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial bot message
        const timer = setTimeout(() => {
            setMessages([{ role: "bot", text: "¡Hola! Soy tu asistente IA de demostración. ¿Querés ver cómo atiendo a tus clientes? Probá preguntarme algo sobre el menú." }]);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

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
                    messages: updatedMessages.filter(m => m.role === "user" || m.role === "bot").map(m => ({
                        role: m.role,
                        text: m.text,
                    })),
                },
            });

            if (error) throw error;
            setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
        } catch {
            setMessages(prev => [...prev, { role: "bot", text: "¡Ups! Algo salió mal. Probá de nuevo en un momento." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <section id="ia-demo" className="relative py-24 md:py-32 bg-white overflow-hidden scroll-mt-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center max-w-7xl mx-auto">
                    <div>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-up">
                            <Sparkles className="w-3 h-3" />
                            Experiencia Viva
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                            No lo contes, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-primary-dynamic">demostralo</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium mb-12 max-w-xl">
                            Tus clientes no quieren esperar a que les respondas. Quieren respuestas instantáneas, precisas y amigables.
                            <span className="text-slate-900 font-bold"> Nuestra IA lo hace posible 24/7.</span>
                        </p>

                        <div className="grid gap-6">
                            {[
                                { icon: Zap, title: "Respuestas al instante", text: "Menos de 2 segundos para responder cualquier duda de stock o precios." },
                                { icon: ShoppingBag, title: "Cierre de ventas", text: "La IA guía al usuario hasta el checkout, aumentando tu conversión." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-dynamic group-hover:text-white transition-all">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">{item.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Device Mockup */}
                        <div className="relative mx-auto w-full max-w-[400px] h-[600px] rounded-[3rem] bg-slate-900 p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-1 ring-slate-800">
                            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-white flex flex-col">
                                {/* Chat Header */}
                                <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-white">
                                    <div className="w-10 h-10 rounded-full bg-primary-dynamic flex items-center justify-center text-white">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900">Vendex AI Bot</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En línea</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Body */}
                                <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.role === 'user'
                                                ? 'bg-slate-900 text-white rounded-tr-none'
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
                                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
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

                            {/* Decorative labels */}
                            <div className="absolute -right-8 top-1/4 p-4 rounded-2xl bg-white shadow-xl rotate-6 border border-slate-100 animate-float hidden md:block">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-900">
                                    <Bot className="w-4 h-4 text-primary-dynamic" />
                                    RESPUESTA IA
                                </div>
                            </div>
                            <div className="absolute -left-12 bottom-1/4 p-4 rounded-2xl bg-white shadow-xl -rotate-6 border border-slate-100 animate-float delay-700 hidden md:block">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-900">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    VENTA CERRADA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveAISection;
