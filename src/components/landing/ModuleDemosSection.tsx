import { useState, useRef, useEffect } from "react";
import { Bot, FileUp, Users, Truck, Brain, BarChart2, Send, Sparkles, ChevronRight } from "lucide-react";

type ModuleId = "bot" | "importador" | "crm" | "logistica" | "inteligencia" | "estadisticas";

interface Command {
  prompt: string;
  response: string;
}

interface Module {
  id: ModuleId;
  label: string;
  badge: "VIP" | "PRO";
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentRing: string;
  accentDot: string;
  description: string;
  commands: Command[];
}

const MODULES: Module[] = [
  {
    id: "bot",
    label: "VENDEx Bot",
    badge: "VIP",
    icon: Bot,
    accentBg: "bg-violet-500",
    accentText: "text-violet-400",
    accentRing: "ring-violet-500/40",
    accentDot: "bg-violet-400",
    description: "Asistente IA que atiende, responde y guía al cliente hacia la compra las 24hs.",
    commands: [
      {
        prompt: "¿Tenés talle M en la remera negra?",
        response: "¡Sí! La remera negra está disponible en talle M 🖤\nPrecio: $8.500\n\n¿Te la agrego al carrito o querés ver más opciones de color?",
      },
      {
        prompt: "¿Cuánto tarda el envío a Córdoba?",
        response: "Los envíos a Córdoba tardan entre 3 y 5 días hábiles 📦\n\nEnvío gratis en compras mayores a $15.000. ¿Continuamos con tu pedido?",
      },
      {
        prompt: "Quiero ver los combos disponibles",
        response: "Tenemos 3 combos activos 🔥\n\n• Combo Básico — $12.000\n• Combo Premium — $22.000\n• Combo Familiar — $35.000\n\n¿Cuál te interesa? Te mando el detalle.",
      },
    ],
  },
  {
    id: "importador",
    label: "Importador IA",
    badge: "VIP",
    icon: FileUp,
    accentBg: "bg-blue-500",
    accentText: "text-blue-400",
    accentRing: "ring-blue-500/40",
    accentDot: "bg-blue-400",
    description: "Cargá fotos de catálogos o listas de precios y la IA digitaliza todo en segundos.",
    commands: [
      {
        prompt: "Importá este catálogo de 80 productos",
        response: "✅ Catálogo procesado en 4.2 segundos\n\n📦 80 productos detectados\n🏷️ 12 categorías creadas automáticamente\n💰 Precios extraídos y asignados\n📸 Imágenes vinculadas\n\nTodo listo para publicar. ¿Revisás antes o lo publicamos directo?",
      },
      {
        prompt: "Detectá precios de esta foto de lista",
        response: "🔍 Imagen analizada\n\nEncontré 24 ítems con precio:\n• Remera básica — $8.500\n• Jean skinny — $24.000\n• Buzo hoodie — $18.500\n(...y 21 más)\n\n¿Importo todos o filtrás primero?",
      },
      {
        prompt: "Actualizá precios con +15% de inflación",
        response: "💹 Actualización masiva aplicada\n\n• 80 productos actualizados\n• Incremento: +15%\n• Precios redondeados automáticamente\n• Cambios guardados\n\n¿Notificamos a los clientes frecuentes?",
      },
    ],
  },
  {
    id: "crm",
    label: "CRM IA",
    badge: "VIP",
    icon: Users,
    accentBg: "bg-emerald-500",
    accentText: "text-emerald-400",
    accentRing: "ring-emerald-500/40",
    accentDot: "bg-emerald-400",
    description: "Conocé a tus clientes, segmentalos y ejecutá acciones de venta personalizadas.",
    commands: [
      {
        prompt: "¿Quiénes son mis mejores clientes?",
        response: "🏆 Top 3 clientes este mes:\n\n1. María González — $142.000 (8 pedidos)\n2. Carlos Ruiz — $98.500 (5 pedidos)\n3. Lucía Fernández — $87.200 (6 pedidos)\n\n¿Querés enviarles una oferta exclusiva por WhatsApp?",
      },
      {
        prompt: "Clientes sin compras hace 30 días",
        response: "😴 Clientes inactivos (30+ días):\n\n• 47 clientes identificados\n• Ticket promedio histórico: $32.000\n• Potencial de recuperación: $1.5M\n\n¿Genero un mensaje de reactivación personalizado para cada uno?",
      },
      {
        prompt: "Segmentá por ticket promedio",
        response: "📊 Segmentación lista:\n\n🔴 Alto valor (+$50k) — 12 clientes\n🟡 Medio ($20k–$50k) — 38 clientes\n🟢 Bajo (−$20k) — 94 clientes\n\n¿Armamos una campaña distinta para cada segmento?",
      },
    ],
  },
  {
    id: "logistica",
    label: "Logística",
    badge: "VIP",
    icon: Truck,
    accentBg: "bg-amber-500",
    accentText: "text-amber-400",
    accentRing: "ring-amber-500/40",
    accentDot: "bg-amber-400",
    description: "Gestioná pedidos, estados de envío y coordinación de entregas desde WhatsApp.",
    commands: [
      {
        prompt: "¿Qué pedidos están pendientes hoy?",
        response: "📋 Pedidos pendientes — Hoy:\n\n• #201 — Ana Müller — $15.400 → Zona Norte\n• #202 — Pedro Gómez — $8.900 → Zona Sur\n• #203 — Julia Reyes — $22.100 → Zona Centro\n\n3 pedidos para despachar. ¿Los marco todos en preparación?",
      },
      {
        prompt: "Marcá el pedido #202 como enviado",
        response: "✅ Pedido #202 actualizado\n\n• Estado: Enviado\n• Notificación enviada a Pedro Gómez por WhatsApp\n• Hora de despacho: ahora\n• Entrega estimada: mañana 10–14hs\n\n¿Seguimos con el #203?",
      },
      {
        prompt: "Resumen de entregas de esta semana",
        response: "📦 Semana en curso:\n\n✅ Entregados: 34\n🚚 En camino: 8\n⏳ Pendientes: 5\n❌ Con problema: 1\n\nTasa de éxito: 97.2% 🔥\n¿Revisamos el pedido con problema?",
      },
    ],
  },
  {
    id: "inteligencia",
    label: "AI Inteligencia",
    badge: "VIP",
    icon: Brain,
    accentBg: "bg-pink-500",
    accentText: "text-pink-400",
    accentRing: "ring-pink-500/40",
    accentDot: "bg-pink-400",
    description: "La IA analiza patrones, predice demanda y te sugiere acciones concretas para vender más.",
    commands: [
      {
        prompt: "¿Qué va a tener más demanda este finde?",
        response: "🔮 Predicción — Este fin de semana:\n\n📈 Alta demanda esperada:\n1. Combo Familiar (+43% vs semana pasada)\n2. Remera básica blanca (+28%)\n3. Jean skinny talle 38 (+21%)\n\nAsegurate stock de estos 3 antes del viernes.",
      },
      {
        prompt: "¿Cuál es mi categoría más rentable?",
        response: "💰 Análisis de rentabilidad:\n\n🥇 Accesorios — 68% de margen\n🥈 Ropa mujer — 52% de margen\n🥉 Calzado — 41% de margen\n\nLos accesorios dejan el doble con 3x menos volumen. ¿Potenciamos esa categoría?",
      },
      {
        prompt: "¿Cuándo es el mejor horario para postear?",
        response: "⏰ Comportamiento de tus clientes:\n\n🔥 Pico de conversión: Jue–Vie 19–21hs\n📱 Mayor tráfico: Sáb 11–13hs\n💤 Horario muerto: Lun–Mar antes de 12hs\n\n¿Agendamos tus próximas publicaciones en los horarios pico?",
      },
    ],
  },
  {
    id: "estadisticas",
    label: "Estadísticas",
    badge: "PRO",
    icon: BarChart2,
    accentBg: "bg-cyan-500",
    accentText: "text-cyan-400",
    accentRing: "ring-cyan-500/40",
    accentDot: "bg-cyan-400",
    description: "Consultá métricas de tu negocio en lenguaje natural, sin planillas ni dashboards complejos.",
    commands: [
      {
        prompt: "¿Cuánto vendí este mes?",
        response: "💵 Ventas — Mes actual:\n\n• Total: $847.200\n• Pedidos: 67\n• Ticket promedio: $12.644\n• vs mes anterior: +18% 📈\n\n¡Tu mejor mes del trimestre! ¿Querés el detalle por semana?",
      },
      {
        prompt: "Top 5 productos más vendidos",
        response: "🏆 Top 5 este mes:\n\n1. Remera básica negra — 43 uds\n2. Jean skinny — 31 uds\n3. Buzo hoodie — 28 uds\n4. Combo Familiar — 24 uds\n5. Calza deportiva — 19 uds\n\n¿Analizamos stock disponible de cada uno?",
      },
      {
        prompt: "Comparame con el mes pasado",
        response: "📊 Comparativa mensual:\n\n             Este mes   Anterior\nVentas       $847k      $718k   ↑18%\nPedidos      67         54      ↑24%\nTicket prom. $12.6k     $13.3k  ↓5%\nClientes new 23         18      ↑28%\n\nCrecés en volumen. El ticket bajó un poco. ¿Investigamos por qué?",
      },
    ],
  },
];

interface Message {
  role: "user" | "bot";
  text: string;
}

const ModuleDemosSection = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>("bot");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const mod = MODULES.find((m) => m.id === activeModule)!;

  useEffect(() => {
    setMessages([]);
    setIsTyping(false);
    setUserInput("");
  }, [activeModule]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendCommand = (prompt: string, response: string) => {
    if (isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
      setIsTyping(false);
    }, 1100);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;
    const text = userInput.trim();
    setUserInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Recibido 👍\n\nEl módulo de ${mod.label} procesaría tu comando y respondería con datos reales de tu negocio en tiempo real.`,
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <section
      id="modulos-demo"
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden scroll-mt-28"
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-violet-500/20">
            <Sparkles className="w-3 h-3" />
            Demos Interactivas
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-4">
            Probá cada módulo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              en vivo
            </span>
          </h2>
          <p className="text-slate-400 font-medium text-lg">
            Escribí o elegí un comando y mirá lo que hace la IA en cada área de tu negocio.
          </p>
        </div>

        {/* Layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          {/* Module tabs */}
          <div className="flex lg:flex-col gap-2 flex-wrap">
            {MODULES.map((m) => {
              const active = m.id === activeModule;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 w-full ${
                    active
                      ? "bg-white/10 ring-1 " + m.accentRing + " text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      active ? m.accentBg + " text-white" : "bg-white/5 text-slate-500"
                    }`}
                  >
                    <m.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black uppercase tracking-wider truncate">
                      {m.label}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 ${
                      m.badge === "VIP"
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {m.badge}
                  </span>
                  {active && <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0 hidden lg:block" />}
                </button>
              );
            })}
          </div>

          {/* Chat panel */}
          <div className="rounded-3xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col shadow-2xl shadow-black/50">
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-slate-900/80">
              <div className={`w-10 h-10 rounded-2xl ${mod.accentBg} flex items-center justify-center text-white shadow-lg`}>
                <mod.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white">{mod.label}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${mod.accentDot}`} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    IA activa · {mod.description.slice(0, 42)}…
                  </span>
                </div>
              </div>
            </div>

            {/* Command suggestions */}
            <div className="px-5 py-3 border-b border-white/5 flex flex-wrap gap-2 bg-slate-950/40">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest self-center mr-1">
                Probá:
              </span>
              {mod.commands.map((cmd) => (
                <button
                  key={cmd.prompt}
                  onClick={() => sendCommand(cmd.prompt, cmd.response)}
                  disabled={isTyping}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    isTyping
                      ? "text-slate-600 border-slate-800 cursor-not-allowed"
                      : "text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white hover:bg-white/5 cursor-pointer"
                  }`}
                >
                  {cmd.prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-[320px] max-h-[380px] overflow-y-auto p-5 space-y-3"
            >
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className={`w-14 h-14 rounded-2xl ${mod.accentBg}/20 flex items-center justify-center mx-auto mb-3`}>
                      <mod.icon className={`w-7 h-7 ${mod.accentText}`} />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                      Hacé clic en un comando de arriba para ver la demo
                    </p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white rounded-tr-none"
                        : "bg-slate-800 border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleCustomSend}
              className="px-4 py-3 border-t border-white/10 flex gap-2 bg-slate-900/60"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Escribí un comando para ${mod.label}...`}
                className="flex-1 bg-slate-800 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
              />
              <button
                type="submit"
                disabled={isTyping || !userInput.trim()}
                className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center hover:bg-violet-500 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleDemosSection;
