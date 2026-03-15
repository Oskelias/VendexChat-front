import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const REGISTER_URL = "https://admin.vendexchat.app/register";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SALES_SYSTEM_PROMPT = `Sos el asistente de ventas de VENDExChat.IA. Tu rol es DOBLE:

FASE 1 - DEMO EN VIVO:
Arrancás invitando al visitante a probar cómo funciona el bot. Le pedís que te diga qué vende (rubro, productos, tipo de negocio). Cuando te lo dice, CAMBIÁS DE ROL y te convertís en el bot IA de SU tienda ficticia. Inventás productos realistas con precios creíbles para ese rubro y respondés como si fueras el asistente de su negocio. Hacé que la experiencia sea lo más real posible: respondé consultas de stock, sugerí productos, resolvé dudas como lo haría un vendedor experto de ese rubro.

Ejemplos de productos ficticios según rubro:
- Hamburguesas: Smash Doble $6.500, Papas Cheddar Bacon $3.200, Combo Triple + Bebida $9.800
- Ropa: Remera Oversize $12.900, Jean Mom Fit $24.500, Campera Puffer $45.000
- Electrónica: Auriculares Bluetooth $15.900, Cargador Turbo USB-C $5.400, Funda iPhone $3.800
- Bebidas: Fernet Branca 750ml $8.900, Coca-Cola 2.25L $2.100, Combo Fernet + Coca $10.500
Adaptá los productos y precios al rubro que te digan. Sé creativo y realista.

FASE 2 - CIERRE DE VENTA:
Después de 3-4 intercambios en modo demo, o cuando el visitante se muestre impresionado, volvé naturalmente al rol de vendedor de VendexChat. Decí algo como "Esto es exactamente lo que tus clientes vivirían en tu tienda, 24/7 y sin que vos hagas nada" y dirigí al registro.

INFORMACIÓN DE VENDEXCHAT (para cuando pregunten):
- Planes: Free (gratis para siempre, 15 productos, 1 categoría), Starter ($14.999/mes, 80 productos, 5 categorías, bot IA WhatsApp), Pro ($24.999/mes, 500 productos, categorías ilimitadas, IA avanzada, analíticas), Enterprise (a medida).
- Se implementa en minutos, sin código, sin conocimientos técnicos.
- Funciona para cualquier comercio.

REGLAS ESTRICTAS:
1. NUNCA escribas URLs, links ni direcciones web. Decí "tocá el botón de Probar Gratis que aparece abajo".
2. NUNCA uses formato markdown (nada de **, [], (), #, etc). Solo texto plano.
3. Respondé en español argentino, conciso y directo. Máximo 2-3 oraciones.
4. Usá máximo 1 emoji por mensaje, no siempre.
5. Sé natural y cercano, como un vendedor copado, no un robot.
6. NO te presentes de nuevo si ya lo hiciste.
7. Cuando estés en modo demo (actuando como bot de su tienda), metete en el papel al 100%.`;

const WELCOME_MESSAGE = "Querés ver cómo funcionaría un bot IA en TU negocio? Hagamos una prueba en vivo. Decime qué vendés y te muestro cómo atendería a tus clientes!";

const QUICK_QUESTIONS = [
  "Vendo hamburguesas",
  "Tengo una tienda de ropa",
  "Vendo electrónica",
];

const SalesAiWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show proactive bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async (overrideInput?: string) => {
    const text = (overrideInput || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!overrideInput) setInput("");
    setIsLoading(true);

    trackEvent("sales_ai_message_sent");

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));
      history.push({ role: "user", content: text });

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SALES_SYSTEM_PROMPT },
            ...history,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error("Groq API error");

      const data = await res.json();
      let aiText =
        data.choices?.[0]?.message?.content ||
        "Disculpá, tuve un problema. Probá de nuevo!";

      // Strip any URLs the model might still generate
      aiText = aiText.replace(/https?:\/\/\S+/g, "").replace(/\s{2,}/g, " ").trim();
      // Strip markdown formatting
      aiText = aiText.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: aiText },
      ]);
    } catch (err) {
      console.error("Sales AI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Tuve un problema técnico. Podés probar gratis desde el botón de arriba o escribirnos por WhatsApp!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    trackEvent("sales_ai_widget_opened");
  };

  const showQuickQuestions = messages.length === 1;

  // Show CTA button when bot mentions registration/trying
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const showCta =
    messages.length > 1 &&
    lastAssistantMsg &&
    /registr|prob[aá]|empez[aá]|plan free|gratis|botón|comenzar/i.test(lastAssistantMsg.content);

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3">
          {/* Proactive bubble */}
          {showBubble && (
            <button
              onClick={handleOpen}
              className="max-w-[260px] px-4 py-3 bg-white rounded-2xl rounded-br-sm shadow-elevated border border-slate-100 text-left animate-in slide-in-from-bottom-2 fade-in duration-300"
            >
              <p className="text-sm font-semibold text-slate-800">
                Tenés dudas sobre VendexChat?
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Preguntale a nuestra IA
              </p>
            </button>
          )}

          {/* Button */}
          <button
            onClick={handleOpen}
            className="relative h-14 w-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-elevated hover:shadow-card hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            aria-label="Abrir asistente de ventas"
          >
            <Sparkles className="w-6 h-6" />
            {/* Ping */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </button>
        </div>
      )}

      {/* Chat modal with backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
      )}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center gap-3 w-full max-w-md">
          <p className="text-white/90 text-sm font-bold text-center drop-shadow-lg">
            Esto es lo que tus clientes vivirían en tu tienda
          </p>
        <div className="w-full h-[min(600px,82vh)] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight">
                  Asistente VendexChat
                </h3>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En línea
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-medium shadow-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-sm"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Quick questions */}
            {showQuickQuestions && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* CTA button when bot suggests registration */}
            {showCta && !isLoading && (
              <div className="flex justify-start">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("sales_ai_cta_click")}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-500/20"
                >
                  Probar Gratis <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "75ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:pb-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Preguntá lo que quieras..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 transition-all min-w-0"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-violet-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-3 opacity-50">
              Potenciado por VENDExChat AI
            </p>
          </div>
        </div>
        </div>
        </div>
      )}
    </>
  );
};

export default SalesAiWidget;
