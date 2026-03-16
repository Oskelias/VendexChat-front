import { useState, useRef, useEffect } from "react";
import { Send, X, ArrowRight } from "lucide-react";
import AssistantIcon from "../icons/AssistantIcon";
import ChatBubbleRobotIcon from "../icons/ChatBubbleRobotIcon";
import { trackEvent } from "@/lib/analytics";

const REGISTER_URL = "https://admin.vendexchat.app/register";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SALES_SYSTEM_PROMPT = `Sos el asistente de VENDExChat. Tu rol principal es RESPONDER LAS PREGUNTAS del visitante de forma clara y honesta. Hablás en español argentino, cercano y natural.

PRIORIDAD #1 - RESPONDER LO QUE PREGUNTAN:
Si preguntan cómo funciona, explicá cómo funciona. Si preguntan precios, dá los precios. Si preguntan algo técnico, respondé con claridad. NUNCA esquives una pregunta para meter una demo o empujar a registrarse.

INFORMACIÓN DE VENDEXCHAT:
- Qué es: Con VENDExChat podés crear tu catálogo digital y tener tu propia tienda online con un link que le enviás a tus clientes. Es tu página web lista en minutos, sin saber código.
- Cómo funciona paso a paso:
  1. Te registrás en la plataforma.
  2. Con el usuario y contraseña que usaste para el registro, ingresás al Administrador de tu tienda.
  3. Configurás los datos de tu tienda (nombre, logo, descripción, etc.).
  4. Cargás tus productos. Podés usar nuestro Importador IA que con un click carga todos los productos automáticamente.
  5. Tu tienda queda lista con un link propio que podés compartir con tus clientes.
  6. Tu web tiene un asistente bot IA que ayuda a tus clientes con consultas en general y hasta puede cerrar ventas, trabajando 24/7 para vos.
  7. Nuestro equipo siempre va a estar disponible para ayudarte.
- PLANES (precios en USD):
  * FREE: Gratis para siempre. 2 categorías, 10 productos por categoría. Menú digital QR, pedidos por WhatsApp. Ideal para validar tu idea y captar tus primeros pedidos sin costo.
  * PRO: USD $13.99/mes (o USD $11.66/mes si pagás anual, total USD $139.9/año — ahorrás USD $27.98). Categorías ilimitadas, productos ilimitados, dominios personalizados, estadísticas de venta. INCLUYE: Importador masivo con IA (con un click cargás todos los productos) y Asistente de Ventas IA.
  * VIP (RECOMENDADO): USD $19.99/mes (o USD $16.66/mes si pagás anual, total USD $199.9/año — ahorrás USD $39.98). Todo lo del plan Pro más: VENDEx Bot con IA, Logística Integrada, CRM con IA & Analítica, Soporte Prioritario. Diferencial: seguimiento postventa y reactivación de clientes desde CRM IA, bot + logística + soporte prioritario en un solo plan. El CRM con IA funciona como un chat inteligente: podés pedirle informes completos sobre tus ventas, clientes, entregas, productos más vendidos, etc., como si le estuvieras hablando a una persona.
  * ULTRA: Precio a medida. Desarrollo a medida, web & hosting propio, bots & automatizaciones, consultoría estratégica, soporte 24/7 VIP.
- AHORRO PLAN ANUAL: Con el plan anual ahorrás un 15% (equivale a 2 meses gratis por año). Recomendado para quienes ya saben que lo van a usar.
- MONEDA DE PAGO: Los precios están expresados en USD, pero el cobro se puede realizar en dólares o en la moneda local del país del cliente.
- Rubros: Funciona para cualquier comercio: comida, bebidas, ropa, electrónica, perfumería, ferretería, etc.

MODO DEMO (solo si el visitante cuenta qué vende o pide una demo):
Si el visitante te dice su rubro, podés hacer una mini demo actuando como el bot IA de su negocio. Inventá 4-5 productos realistas con precios creíbles. Pero solo hacé esto si el visitante lo pide o lo inicia, no lo fuerces.

Ejemplos de productos ficticios según rubro:
- Hamburguesas: Smash Doble $6.500, Papas Cheddar Bacon $3.200, Combo Triple + Bebida $9.800, Nuggets x6 $4.100
- Ropa: Remera Oversize $12.900, Jean Mom Fit $24.500, Campera Puffer $45.000, Buzo Hoodie $18.900
- Electrónica: Auriculares Bluetooth $15.900, Cargador Turbo USB-C $5.400, Funda iPhone $3.800, Cable HDMI 4K $4.200

DESPEDIDA:
Si el visitante dice chau, adiós, gracias, o quiere terminar la conversación, despedite amablemente. NO sigas vendiendo ni insistas. Decí algo como "Genial, cualquier cosa acá estoy. Éxitos!" y listo.

REGLAS:
1. RESPONDÉ lo que te preguntan. No desvíes cada respuesta hacia "probá gratis".
2. NUNCA escribas URLs ni links. Si querés mencionar el registro, decí "podés registrarte desde el botón de arriba".
3. NUNCA uses markdown (**, [], #). Solo texto plano.
4. Español argentino, tono conversacional y cercano. Máximo 3 oraciones por mensaje.
5. Máximo 1 emoji por mensaje, y solo cuando fluya natural.
6. Si dice que no o se despide, respetá y no insistas.
7. NO menciones "probar gratis" ni "registrarse" en cada mensaje. Solo mencionalo si es relevante a lo que preguntan o si ya resolviste todas sus dudas.
8. Sé genuino, empático y útil. Nada de sonar robótico ni como vendedor agresivo.`;

const WELCOME_MESSAGE = "Hola! Soy el asistente de VENDExChat. Te puedo ayudar con cualquier duda sobre la plataforma, planes o cómo empezar. También puedo hacerte una demo en vivo si me contás qué vendés!";

const QUICK_QUESTIONS = [
  "Cómo funciona?",
  "Cuánto sale?",
  "Es difícil de usar?",
  "Tengo una hamburguesería",
  "Vendo ropa online",
  "Mi negocio es de electrónica",
];

const FAREWELL_REGEX = /^(chau|adiós|adios|hasta luego|nos vemos|bye|gracias,?\s*chau|gracias,?\s*adios|gracias,?\s*adiós)/i;
const RESET_DELAY = 2 * 60 * 1000; // 2 minutes

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
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetConversation = () => {
    setMessages([{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }]);
    setInput("");
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(resetConversation, RESET_DELAY);
  };

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

  // Clear inactivity timer when widget closes
  useEffect(() => {
    if (!isOpen && inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
  }, [isOpen]);

  const handleSend = async (overrideInput?: string) => {
    const text = (overrideInput || input).trim();
    if (!text || isLoading) return;

    // Reset conversation if user says goodbye
    if (FAREWELL_REGEX.test(text)) {
      const farewellMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text,
      };
      const farewellReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Fue un placer! Recordá que podés probar el plan PRO gratis por 15 días sin tarjeta de crédito, y el plan Free es libre de uso para siempre. Cuando quieras empezar, el botón de arriba te lleva directo. Éxitos con tu negocio! 🚀",
      };
      setMessages((prev) => [...prev, farewellMsg, farewellReply]);
      if (!overrideInput) setInput("");
      setTimeout(resetConversation, 5000);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!overrideInput) setInput("");
    setIsLoading(true);
    resetInactivityTimer();

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
        "Perdón, se me cortó. Probá de nuevo que ya debería andar.";

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
            "Uy, algo falló de mi lado. Si querés, podés probar gratis desde el botón de arriba o escribirnos por WhatsApp.",
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

  // Show CTA button only when bot explicitly mentions registration
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const showCta =
    messages.length > 3 &&
    lastAssistantMsg &&
    /registr|botón de arriba|plan free/i.test(lastAssistantMsg.content);

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 md:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))] md:right-8 z-50 flex flex-col items-end gap-3">
          {/* Proactive bubble */}
          {showBubble && (
            <button
              onClick={handleOpen}
              className="max-w-[260px] px-4 py-3 bg-white rounded-2xl rounded-br-sm shadow-elevated border border-slate-100 text-left animate-in slide-in-from-bottom-2 fade-in duration-300"
            >
              <p className="text-sm font-semibold text-slate-800">
                Querés ver cómo funciona?
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Charlá con nuestro asistente
              </p>
            </button>
          )}

          {/* Button */}
          <button
            onClick={handleOpen}
            className="relative h-14 w-14 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
            aria-label="Abrir asistente de ventas"
          >
            <ChatBubbleRobotIcon className="w-14 h-14 drop-shadow-lg" />
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
            Así chatearían tus clientes con tu negocio
          </p>
        <div className="w-full h-[min(600px,82vh)] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <AssistantIcon className="w-6 h-6" />
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
                placeholder="Escribí tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[16px] font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 transition-all min-w-0"
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
