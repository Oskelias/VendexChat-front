import { useState, useRef, useEffect } from "react";
import {
  Bot, Users, Truck, Brain, BarChart2,
  Send, Sparkles, ChevronRight, ShoppingCart, Store, Cpu
} from "lucide-react";

type ModuleId = "bot" | "crm" | "logistica" | "inteligencia" | "estadisticas";
type TabId = "cliente" | "gestion" | "ia";

interface Command {
  prompt: string;
  response: string;
}

interface Module {
  id: ModuleId;
  tab: TabId;
  label: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentRing: string;
  accentDot: string;
  description: string;
  commands: Command[];
}

const TABS: { id: TabId; label: string; icon: React.ElementType; description: string }[] = [
  {
    id: "cliente",
    label: "Para el cliente",
    icon: ShoppingCart,
    description: "Lo que vive el comprador al interactuar con tu tienda",
  },
  {
    id: "gestion",
    label: "Gestión de tienda",
    icon: Store,
    description: "Todo lo que manejás internamente como comerciante",
  },
  {
    id: "ia",
    label: "Inteligencia IA",
    icon: Cpu,
    description: "La IA analizando y potenciando cada decisión de tu negocio",
  },
];

const MODULES: Module[] = [
  {
    id: "bot",
    tab: "cliente",
    label: "VENDEx Bot",
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
    id: "crm",
    tab: "gestion",
    label: "CRM IA",
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
    tab: "gestion",
    label: "Logística",
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
    tab: "ia",
    label: "AI Inteligencia",
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
    tab: "ia",
    label: "Estadísticas",
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
  const [activeTab, setActiveTab] = useState<TabId>("cliente");
  const [activeModule, setActiveModule] = useState<ModuleId>("bot");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabModules = MODULES.filter((m) => m.tab === activeTab);
  const mod = MODULES.find((m) => m.id === activeModule)!;
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  // When switching tab, select first module of that tab
  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    const firstModule = MODULES.find((m) => m.tab === tabId);
    if (firstModule) setActiveModule(firstModule.id);
  };

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
      id="ia"
      className="relative py-6 md:py-10 min-h-screen bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
            <span className="text-white">Todo lo que puede hacer </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">VENDExChat.IA</span>
          </h2>
        </div>

        {/* Top tabs */}
        <div className="max-w-6xl mx-auto mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {TABS.map((tab, i) => {
              const active = tab.id === activeTab;
              const colors = [
                { active: "bg-violet-600 border-violet-600 text-white", inactive: "bg-violet-600/40 border-violet-400/50 text-white", num: "bg-violet-500/30 text-violet-200" },
                { active: "bg-blue-600 border-blue-600 text-white", inactive: "bg-blue-600/40 border-blue-400/50 text-white", num: "bg-blue-500/30 text-blue-200" },
                { active: "bg-pink-600 border-pink-600 text-white", inactive: "bg-pink-600/40 border-pink-400/50 text-white", num: "bg-pink-500/30 text-pink-200" },
              ][i];
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 text-left ${
                    active
                      ? colors.active + " shadow-xl scale-[1.02]"
                      : colors.inactive + " hover:scale-[1.01] opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/20">
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black uppercase tracking-wider">{tab.label}</div>
                    <div className="text-[11px] font-medium mt-0.5 leading-tight text-white/70">
                      {tab.description}
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0 ${
                    active ? "bg-white/20 text-white" : colors.num
                  }`}>
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: sidebar + chat */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_1fr] gap-6 items-start">
          {/* Module list */}
          <div className="flex lg:flex-col gap-2 flex-wrap">
            {tabModules.map((m) => {
              const active = m.id === activeModule;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 w-full ${
                    active
                      ? "bg-white/20 ring-1 " + m.accentRing + " text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      active ? m.accentBg + " text-white" : "bg-white/10 text-white/50"
                    }`}
                  >
                    <m.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black uppercase tracking-wider truncate">{m.label}</div>
                  </div>
                  {active && <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0 hidden lg:block" />}
                </button>
              );
            })}
          </div>

          {/* Chat panel */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-2xl shadow-slate-200/60">
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3 bg-white">
              <div className={`w-10 h-10 rounded-2xl ${mod.accentBg} flex items-center justify-center text-white shadow-lg`}>
                <mod.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900">{mod.label}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${mod.accentDot}`} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    IA activa · {mod.description.slice(0, 42)}…
                  </span>
                </div>
              </div>
              {/* Tab badge */}
              <div className="ml-auto">
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  {currentTab.label}
                </span>
              </div>
            </div>

            {/* Command suggestions */}
            <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap gap-2 bg-slate-50">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest self-center mr-1">
                Probá:
              </span>
              {mod.commands.map((cmd) => (
                <button
                  key={cmd.prompt}
                  onClick={() => sendCommand(cmd.prompt, cmd.response)}
                  disabled={isTyping}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    isTyping
                      ? "text-slate-300 border-slate-100 cursor-not-allowed"
                      : "text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {cmd.prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-[180px] max-h-[230px] overflow-y-auto p-5 space-y-3"
            >
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center px-4">
                    <div className={`w-20 h-20 rounded-3xl ${mod.accentBg}/20 flex items-center justify-center mx-auto mb-5`}>
                      <mod.icon className={`w-10 h-10 ${mod.accentText}`} />
                    </div>
                    <p className="text-slate-700 text-base font-semibold mb-2">
                      Hacé clic en un comando de arriba para ver la demo
                    </p>
                    <p className="text-slate-400 text-sm font-medium">
                      o escribí una consulta para que la IA te responda
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
                        : "bg-slate-100 border border-slate-200 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleCustomSend}
              className="px-4 py-3 border-t border-violet-100 flex gap-2 bg-violet-50/50"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={`Escribí un comando para ${mod.label}...`}
                className="flex-1 bg-white border border-violet-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
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
