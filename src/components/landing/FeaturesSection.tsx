import {
  Upload,
  Bot,
  Users,
  BarChart3,
  Brain,
  MessageSquare,
  Package,
  ClipboardList,
  ShoppingCart,
  Truck,
  Tag,
  Ban,
  Smartphone,
  Globe,
  Zap,
  Crown,
  Sparkles,
} from "lucide-react";
import { REGISTER_URL } from "@/lib/constants";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  plan: "FREE" | "PRO" | "VIP" | "ULTRA";
  highlight?: boolean;
}

const PLAN_STYLES: Record<Feature["plan"], { label: string; bg: string; text: string; dot: string }> = {
  FREE:  { label: "FREE",  bg: "bg-slate-100",   text: "text-slate-500",  dot: "bg-slate-400" },
  PRO:   { label: "PRO",   bg: "bg-indigo-100",  text: "text-indigo-600", dot: "bg-indigo-500" },
  VIP:   { label: "VIP",   bg: "bg-yellow-100",  text: "text-yellow-600", dot: "bg-yellow-500" },
  ULTRA: { label: "ULTRA", bg: "bg-violet-100",  text: "text-violet-600", dot: "bg-violet-500" },
};

const PLAN_ORDER: Feature["plan"][] = ["FREE", "PRO", "VIP", "ULTRA"];

const features: Feature[] = [
  {
    icon: Package,
    title: "Catálogo Digital",
    description: "Creá tu tienda online con productos, fotos, precios y stock. Tus clientes compran desde el celular sin app.",
    plan: "FREE",
  },
  {
    icon: ClipboardList,
    title: "Pedidos por WhatsApp",
    description: "Cada pedido llega directo a tu WhatsApp con los productos, cantidades y datos del cliente listos para despachar.",
    plan: "FREE",
  },
  {
    icon: ShoppingCart,
    title: "POS — Punto de Venta",
    description: "Tomá pedidos en mostrador directamente desde el panel. Ideal para atención presencial y telefónica.",
    plan: "FREE",
  },
  {
    icon: Globe,
    title: "Dominio Personalizado",
    description: "Tu tienda con tu propio dominio (tutienda.com). Imagen profesional sin costo de infraestructura.",
    plan: "PRO",
  },
  {
    icon: Upload,
    title: "Importador Masivo con IA",
    description: "Subí fotos de tu catálogo, una lista o un archivo. La IA extrae nombre, precio, categoría y carga todos los productos en segundos.",
    plan: "PRO",
    highlight: true,
  },
  {
    icon: Smartphone,
    title: "Asistente de Ventas IA",
    description: "IA entrenada con tu catálogo y tus instrucciones. Responde consultas, recomienda productos y guía al cliente hasta el carrito.",
    plan: "PRO",
    highlight: true,
  },
  {
    icon: Tag,
    title: "Estadísticas de Venta",
    description: "Métricas en tiempo real: productos más vendidos, días pico, ticket promedio y evolución mensual de ingresos.",
    plan: "PRO",
  },
  {
    icon: Bot,
    title: "VENDEx Bot 24/7",
    description: "Bot IA autónomo que atiende a tus clientes todo el día y toda la noche. Responde, asesora y convierte visitas en ventas mientras vos dormís.",
    plan: "VIP",
    highlight: true,
  },
  {
    icon: Users,
    title: "CRM con IA",
    description: "Historial completo de cada cliente: qué compró, cuándo, cuánto gasta. Segmentá y enviá mensajes personalizados para reactivar ventas.",
    plan: "VIP",
    highlight: true,
  },
  {
    icon: Truck,
    title: "Logística Integrada",
    description: "Gestioná envíos y entregas desde el panel. Asigná repartidores, seguí el estado de cada pedido y notificá al cliente en tiempo real.",
    plan: "VIP",
  },
  {
    icon: Brain,
    title: "Inteligencia IA",
    description: "Predicción de demanda, detección de tendencias y sugerencias automáticas para optimizar tu stock y tus ofertas.",
    plan: "ULTRA",
    highlight: true,
  },
  {
    icon: BarChart3,
    title: "Estadísticas IA Avanzadas",
    description: "Preguntale a la IA sobre tus ventas en lenguaje natural. Recibí análisis profundos, gráficos y recomendaciones accionables al instante.",
    plan: "ULTRA",
    highlight: true,
  },
  {
    icon: MessageSquare,
    title: "Bot WhatsApp",
    description: "Conectá tu número de WhatsApp al bot IA. Atendé consultas, enviá catálogos y procesá pedidos directo desde WhatsApp Business.",
    plan: "ULTRA",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Automatizaciones",
    description: "Disparadores automáticos: carrito abandonado, bienvenida a nuevos clientes, recordatorio de stock bajo y más.",
    plan: "ULTRA",
  },
  {
    icon: Ban,
    title: "Sin Comisiones",
    description: "Vendés sin pagar porcentaje por cada transacción. Tu ganancia es 100% tuya, en todos los planes.",
    plan: "FREE",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden scroll-mt-28">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-[0.25em]">Panel IA — Todo incluido</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Todo lo que podés hacer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-600">con el panel IA</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Desde cargar tu primer producto hasta predecir tu próxima tendencia. Un solo panel, todo automatizado.
          </p>
        </div>

        {/* Plan legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {PLAN_ORDER.map((plan) => {
            const s = PLAN_STYLES[plan];
            return (
              <span key={plan} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black tracking-widest ${s.bg} ${s.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            );
          })}
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {features.map((f, i) => {
            const ps = PLAN_STYLES[f.plan];
            return (
              <div
                key={i}
                className={`group relative p-7 rounded-3xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  f.highlight
                    ? "border-slate-200 shadow-lg shadow-slate-100/80 hover:shadow-violet-100"
                    : "border-slate-100 shadow-md shadow-slate-100/50"
                }`}
              >
                {/* Plan badge */}
                <span className={`absolute top-5 right-5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest ${ps.bg} ${ps.text}`}>
                  <span className={`w-1 h-1 rounded-full ${ps.dot}`} />
                  {ps.label}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                  f.highlight ? "bg-gradient-to-br from-emerald-50 to-violet-50 text-violet-600" : "bg-slate-50 text-slate-500"
                }`}>
                  <f.icon className="w-6 h-6" />
                </div>

                <h3 className="text-[15px] font-black text-slate-900 mb-2 leading-tight group-hover:text-violet-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {f.description}
                </p>

                {/* Highlight glow */}
                {f.highlight && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href={REGISTER_URL}
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-sm tracking-wide uppercase"
          >
            <Crown className="w-5 h-5" />
            Empezar gratis — sin tarjeta
          </a>
          <p className="text-[12px] text-slate-400 mt-3 font-medium">Probá gratis. Activá los módulos IA cuando quieras.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
