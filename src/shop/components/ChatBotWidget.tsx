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
            content: welcomeMessage || `¡Hola! 👋 Bienvenido a ${storeName}. Estoy acá para lo que necesites, preguntame lo que quieras.`
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasTriggeredInitial = useRef(false);

    const systemPrompt = useMemo(() => {
        const productList = products.map(p => {
            const stockStatus = p.unlimited_stock
                ? 'disponible'
                : p.stock > 0
                    ? `disponible (stock: ${p.stock})`
                    : 'SIN STOCK / agotado';
            return `- ${p.name}: $${p.price} | ${stockStatus}`;
        }).join('\n');
        return aiPrompt || `Sos un asistente copado y cercano de "${storeName}". Hablás como una persona real, no como un robot.
            Datos de la tienda — Descripción: ${storeDescription || 'Tienda online'}. Ubicación: ${storeAddress || 'Consultar por WhatsApp'}.

            Tu personalidad: sos amable, relajado y servicial. Hablás como un empleado joven que conoce bien el negocio. Usás lenguaje natural y coloquial (español rioplatense). Podés usar expresiones como "dale", "genial", "buenísimo", "mirá", "fijate que...".

            Qué podés hacer: informar sobre precios, horarios, disponibilidad, promos y descuentos. Si preguntan por un producto, dale el precio y si hay stock. Si quieren ver todo el menú o detalles de ingredientes, deciles que lo encuentran en la tienda web.

            REGLAS CLAVE:
            1. NO gestionés la venta: nunca digas "te lo agrego al carrito" ni cierres pedidos. El cliente elige y agrega productos desde la tienda.
            2. Si quieren comprar, explicales el proceso de forma simple: "Buscalo en la tienda, lo agregás al carrito y listo".
            3. Podés sugerir 2-3 productos si preguntan qué hay, pero no listes todo el catálogo.
            4. Para detalles de ingredientes, mandalo a la ficha del producto en la web.
            5. Respondé en español, de forma concisa y natural. Máximo 2-3 oraciones por mensaje.
            6. NO te volvás a presentar si ya estás hablando con el cliente. Seguí el hilo de la conversación.
            7. Usá máximo 1 emoji por mensaje, y solo cuando sea natural (no forzado).
            8. Variá tus respuestas, no uses siempre las mismas frases. Soná genuino.
            9. Si no sabés algo, decilo con honestidad: "Eso no lo tengo acá, pero podés consultarlo por WhatsApp".

            Catálogo actual (para consultas de precio y stock):
            ${productList}`;
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
                content: "Uy, perdón, algo falló de mi lado. ¿Podés intentar de nuevo? Si seguís con problemas, escribinos por WhatsApp que te ayudamos al toque."
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
                        <h3 className="font-black text-sm uppercase tracking-tight">Chat de ayuda</h3>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Conectado</p>
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
                        placeholder="Escribí tu mensaje..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-primary-dynamic/20 transition-all min-w-0"
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
