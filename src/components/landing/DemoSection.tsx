import {
  ExternalLink,
  ShoppingCart,
  Bot,
  BarChart2,
  FileUp,
  Users,
  Truck,
  Brain,
  MessageCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const dashboardModules = [
  {
    icon: Bot,
    label: "VENDEx Bot",
    stat: "24/7 activo",
    color: "bg-violet-500",
  },
  {
    icon: FileUp,
    label: "Importador IA",
    stat: "80 productos en 4s",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    label: "CRM Inteligente",
    stat: "144 clientes",
    color: "bg-emerald-500",
  },
  {
    icon: Truck,
    label: "Logística",
    stat: "97% entregados",
    color: "bg-amber-500",
  },
  {
    icon: Brain,
    label: "IA Predictiva",
    stat: "Predicción demanda",
    color: "bg-pink-500",
  },
  {
    icon: BarChart2,
    label: "Estadísticas",
    stat: "$847k este mes",
    color: "bg-cyan-500",
  },
];

const DemoSection = () => {
  return (
    <section
      id="demo"
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-28 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">
            Demo en vivo
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Mirá cómo funciona{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              de verdad
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Arriba lo que ve tu cliente. Abajo, tu panel con todas las
            herramientas de IA.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* ── TOP: Store preview (client view) ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
                Lo que ve tu cliente
              </h3>
            </div>

            {/* Browser frame */}
            <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden bg-white">
              {/* Browser bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-slate-400 font-medium border border-slate-200 flex items-center gap-2">
                  <span className="text-slate-300">🔒</span>
                  vendexchat.app/demo
                </div>
                <a
                  href="/demo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  onClick={() => trackEvent("demo_store_click")}
                >
                  Abrir <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe */}
              <div className="relative" style={{ height: "480px" }}>
                <iframe
                  src="/demo"
                  title="Demo tienda - Vista del cliente"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ── BOTTOM: Dashboard mockup ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-5 h-5 text-violet-500" />
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
                Tu dashboard con IA
              </h3>
            </div>

            {/* Dashboard frame */}
            <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden bg-white">
              {/* Browser bar */}
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-slate-700 rounded-lg px-3 py-1 text-xs text-slate-400 font-medium border border-slate-600 flex items-center gap-2">
                  <span className="text-slate-500">🔒</span>
                  admin.vendexchat.app/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-slate-50 p-5 md:p-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    {
                      label: "Ventas hoy",
                      value: "$127.400",
                      icon: TrendingUp,
                      change: "+18%",
                      color: "text-emerald-500",
                    },
                    {
                      label: "Pedidos",
                      value: "47",
                      icon: Package,
                      change: "+12",
                      color: "text-blue-500",
                    },
                    {
                      label: "Mensajes IA",
                      value: "234",
                      icon: MessageCircle,
                      change: "activo",
                      color: "text-violet-500",
                    },
                    {
                      label: "Clientes nuevos",
                      value: "8",
                      icon: Users,
                      change: "+3",
                      color: "text-pink-500",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {stat.label}
                        </span>
                        <stat.icon
                          className={`w-3.5 h-3.5 ${stat.color}`}
                        />
                      </div>
                      <div className="text-lg md:text-xl font-black text-slate-900">
                        {stat.value}
                      </div>
                      <span
                        className={`text-[10px] font-bold ${stat.color}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Modules grid */}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Herramientas IA disponibles
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dashboardModules.map((m) => (
                    <div
                      key={m.label}
                      className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${m.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}
                      >
                        <m.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-800 truncate">
                          {m.label}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">
                          {m.stat}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <a
              href="https://admin.vendexchat.app/register"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-emerald-500 text-white font-bold text-base hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95"
              onClick={() => trackEvent("demo_section_cta_click")}
            >
              Quiero mi tienda así <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
