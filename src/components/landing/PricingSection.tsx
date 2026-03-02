import { Check, Bot } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const plans = [
  {
    name: "Free",
    price: "$0 / mes",
    features: [
      "2 Categorías",
      "10 Productos por categoría",
      "Módulos principales",
      "Contiene publicidad",
      "Menú QR",
    ],
    cta: "Empezar",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_free_click",
    hasAI: false,
  },
  {
    name: "Pro",
    price: "USD 4.99 / mes",
    highlight: "Más popular",
    features: [
      "4 Categorías",
      "20 Productos por categoría",
      "Todos los módulos",
      "Soporte Técnico",
      "Publicidad en nuestras redes",
      "Menú QR",
      "Cambio de precios rápido",
      "Estadísticas",
      "Costo de envío por zonas",
      "Control de horarios",
      "Impresión Ticket / Comanda",
    ],
    aiFeatures: [
      "Importador IA (foto → catálogo)",
      "Asistente IA 24/7",
    ],
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_pro_click",
    hasAI: true,
  },
  {
    name: "Premium",
    price: "USD 9.99 / mes",
    features: [
      "Categorías ilimitadas",
      "Productos ilimitados",
      "Todos los módulos",
      "Soporte Técnico",
      "Publicidad en nuestras redes",
      "Menú QR",
      "Control de pedidos",
      "Impresión de comanda",
      "Seguimiento de pedido",
      "Campos personalizados",
      "Cambio de precios rápido",
      "Estadísticas",
      "Costo de envío por zonas",
      "Control de horarios",
    ],
    aiFeatures: [
      "Importador IA (foto → catálogo)",
      "Asistente IA 24/7",
      "Analítica IA básica",
    ],
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_premium_click",
    hasAI: true,
  },
  {
    name: "Business",
    price: "USD 14.99 / mes",
    features: [
      "Todo lo de Premium +",
      "Mensajes emergentes",
      "Cupones de descuento",
      "Productos destacados",
      "Exportar pedidos a Excel",
      "Control de caja",
      "Variante de productos",
      "Límite de compra mínima",
      "Armado de combos",
      "Facebook Pixel",
      "Google Analytics",
    ],
    aiFeatures: [
      "Importador IA (foto → catálogo)",
      "Asistente IA 24/7 avanzado",
      "Analítica IA + Insights",
      "Estadísticas avanzadas IA",
    ],
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_business_click",
    hasAI: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-10 md:py-14 min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/50 -z-20" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Planes que escalan <span className="text-primary-dynamic text-gradient">con tu negocio</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Empezá gratis. Sumá IA cuando tu negocio lo pida.
          </p>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="inline-flex items-center gap-1 rounded-2xl bg-white border border-slate-100 p-1.5 shadow-xl shadow-slate-200/50">
            <button className="px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 transition-all">
              Mensual
            </button>
            <button className="px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-400 hover:text-slate-600 transition-all">
              Anual <span className="text-primary-dynamic ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isPro = plan.name === "Pro";
            return (
              <div
                key={plan.name}
                className={`
                  group relative p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2
                  ${isPro
                    ? 'bg-violet-900 text-white shadow-2xl shadow-violet-900/40 scale-105 z-10'
                    : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-primary-dynamic/20'
                  }
                `}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-dynamic text-[8px] font-black text-white uppercase tracking-[0.2em] rounded-full shadow-lg">
                    {plan.highlight}
                  </div>
                )}

                {plan.hasAI && !isPro && (
                  <div className="absolute -top-3 right-6 flex items-center gap-1 px-3 py-1 bg-violet-600 text-[8px] font-black text-white uppercase tracking-wider rounded-full">
                    <Bot className="w-2.5 h-2.5" /> IA incluida
                  </div>
                )}

                <div className="text-center mb-10">
                  <h3 className={`text-xl font-black mb-1 uppercase tracking-tighter ${isPro ? 'text-violet-100' : 'text-slate-900'}`}>{plan.name}</h3>
                  <div className="h-1 w-10 bg-primary-dynamic mx-auto rounded-full mb-4 opacity-50" />
                  <p className={`text-2xl font-black ${isPro ? 'text-violet-100' : 'text-slate-900'}`}>{plan.price}</p>
                </div>

                {/* AI Features block */}
                {plan.aiFeatures && (
                  <div className={`mb-6 p-4 rounded-2xl ${isPro ? 'bg-primary-dynamic/20 border border-primary-dynamic/30' : 'bg-violet-50 border border-violet-100'}`}>
                    <div className={`flex items-center gap-1.5 mb-3 text-[9px] font-black uppercase tracking-widest ${isPro ? 'text-primary-dynamic' : 'text-violet-600'}`}>
                      <Bot className="w-3 h-3" /> Funciones IA
                    </div>
                    <ul className="space-y-2">
                      {plan.aiFeatures.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`w-3 h-3 mt-0.5 flex-shrink-0 ${isPro ? 'text-primary-dynamic' : 'text-violet-500'}`} />
                          <span className={`text-[10px] font-bold leading-tight ${isPro ? 'text-violet-100' : 'text-violet-700'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isPro ? 'bg-primary-dynamic/20 text-primary-dynamic' : 'bg-slate-50 text-slate-400'}`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={`text-[11px] font-medium leading-tight ${isPro ? 'text-violet-200' : 'text-slate-500'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent(plan.event)}
                  className={`
                    w-full inline-flex items-center justify-center px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all
                    ${isPro
                      ? 'bg-primary-dynamic text-white hover:bg-emerald-400 shadow-xl shadow-primary-dynamic/20'
                      : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-12">
          Todos los planes incluyen 14 días de prueba gratis · Sin tarjeta de crédito
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
