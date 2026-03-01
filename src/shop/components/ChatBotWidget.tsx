import { useState, useRef, useEffect, useMemo } from "react";
import { Send, X, MessageCircle, Bot } from "lucide-react";
import { sanitizePhoneNumber } from "../../utils/format";

interface Message {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
}

interface ChatBotWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    storeName: string;
    storeDescription?: string;
    storeAddress?: string;
    whatsappNumber?: string;
    products: any[];
    aiPrompt?: string | null;
    welcomeMessage?: string | null;
    initialMessage?: string | null;
}

export function ChatBotWidget({
    isOpen,
    onClose,
    storeName,
    storeDescription,
    storeAddress,
    whatsappNumber,
    products,
    aiPrompt,
    welcomeMessage,
    initialMessage
}: ChatBotWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: "assistant",
            content: welcomeMessage || `¡Hola! 👋 Soy el asistente virtual de **${storeName}**. ¿En qué puedo ayudarte hoy?`
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasTriggeredInitial = useRef(false);

    const systemPrompt = useMemo(() => {
        const sampleProducts = products.slice(0, 5).map(p => `- ${p.name}: $${p.price}`).join('\n');
        return aiPrompt || `Sos el asistente de atención al cliente de la tienda "${storeName}".
            Descripción: ${storeDescription || 'Tienda online'}.
            Dirección/Ubicación: ${storeAddress || 'Consultar por WhatsApp'}.

            TU ÚNICA FUNCIÓN es ayudar con el PROCESO DE COMPRA: cómo agregar productos al carrito, cómo finalizar el pedido, medios de pago disponibles, horarios de atención y entrega, promociones y descuentos.

            REGLAS ESTRICTAS:
            1. Para CUALQUIER consulta sobre productos, menú, ingredientes, disponibilidad o precios respondé SIEMPRE: "Podés ver todo el menú con fotos y precios en nuestra tienda 🛒 Si tenés alguna duda sobre cómo comprar, te ayudo acá."
            2. NUNCA listés el catálogo completo. Si el cliente insiste en ver productos, repetí que los vea en la tienda web.
            3. NUNCA cierres la venta vos. El cliente es quien elige y agrega los productos al carrito. Tu rol es guiar el proceso, no decidir por él.
            4. Si preguntan por ingredientes o detalles de un producto, deciles que esa info está en la ficha del producto en la tienda web.
            5. Podés hablar sobre promociones, descuentos, horarios, formas de pago y cómo funciona el proceso de pedido.
            6. Respondé siempre en Español, de forma directa. Máximo 2 oraciones por respuesta.
            7. No hagas preguntas de más. Si no podés ayudar, sugerí contactar por WhatsApp.

            Referencia de algunos productos (solo para contexto interno, NO los listes):
            ${sampleProducts}`;
    }, [products, aiPrompt, storeName, storeDescription, storeAddress]);

    useEffect(() => {
        if (isOpen && initialMessage && !hasTriggeredInitial.current) {
            hasTriggeredInitial.current = true;
            // Esperar un poco a que abra el widget antes de "escribir"
            setTimeout(() => {
                handleSend(initialMessage);
            }, 500);
        }
    }, [isOpen, initialMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: textToSend.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        if (!overrideInput) setInput("");
        setIsLoading(true);

        try {
            const chatHistory = messages.filter(m => m.id !== '1').map(m => ({ role: m.role, content: m.content }));
            chatHistory.push({ role: "user", content: textToSend.trim() });

            // Llamada a Pollinations AI (Text)
            const response = await fetch(`https://text.pollinations.ai/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...chatHistory
                    ],
                    model: "openai",
                    seed: 42
                })
            });

            if (!response.ok) throw new Error("Error en la respuesta de la IA");

            const aiText = await response.text();

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiText
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: "Lo siento, tuve un pequeño problema técnico. ¿Podrías intentar de nuevo o contactarnos por WhatsApp?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 md:inset-auto md:bottom-4 md:right-4 z-[100] w-full md:w-[400px] h-full md:h-[600px] md:max-h-[80vh] bg-white md:rounded-3xl shadow-2xl border-t md:border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-full md:slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="p-4 bg-primary-dynamic text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-black text-sm uppercase tracking-tight">Asistente IA</h3>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">En línea</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-black/10 rounded-xl transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm ${m.role === "user"
                            ? "bg-primary-dynamic text-white rounded-tr-sm"
                            : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-100 flex gap-1">
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75" />
                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-4 bg-white border-t border-slate-100 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:pb-4">
                {whatsappNumber && (
                    <a
                        href={`https://wa.me/${sanitizePhoneNumber(whatsappNumber)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 mb-3 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Hablar con un humano
                    </a>
                )}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Escribe tu consulta..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-dynamic/20 transition-all min-w-0"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-primary-dynamic text-white rounded-2xl shadow-lg shadow-primary-dynamic/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-center text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-3 opacity-50">
                    Potenciado por VendexChat AI
                </p>
            </div>
        </div>
    );
}
