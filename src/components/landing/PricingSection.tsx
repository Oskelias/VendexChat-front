import { Check, Shield, Zap, Crown } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const plans = [
  {
    name: "FREE",
    price: "$0",
    priceSuffix: "/ mes",
    icon: Shield,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-400",
    features: [
      "2 Categorías",
      "10 Productos por cat.",
      "Menú Digital QR",
      "Pedidos por WhatsApp",
    ],
    cta: null,
    href: null,
    event: "pricing_free_click",
  },
  {
    name: "PREMIUM (PRO)",
    price: "$9.99",
    priceSuffix: "/ mes",
    icon: Zap,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    highlight: "RECOMENDADO",
    features: [
      "Categorías Ilimitadas",
      "Productos Ilimitados",
      "Dominios Personalizados",
      "Estadísticas de Venta",
      "Exportar a Excel",
    ],
    cta: null,
    href: null,
    event: "pricing_premium_click",
  },
  {
    name: "VIP (BUSINESS)",
    price: "$14.99",
    priceSuffix: "/ mes",
    icon: Crown,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    features: [
      "Todo lo anterior Pro",
      "VENDEx Bot (Beta)",
      "Logística Integrada",
      "Control de Stock Avanzado",
      "Soporte Prioritario",
    ],
    cta: "SUSCRIBIRSE",
    ctaStyle: "bg-emerald-500 hover:bg-emerald-600 text-white",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_vip_click",
  },
  {
    name: "ULTRA",
    price: "Custom",
    priceSuffix: null,
    isCustom: true,
    icon: Zap,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    features: [
      "Desarrollo a Medida",
      "Web & Hosting Propio",
      "Bots & Automatizaciones",
      "Consultoría Estratégica",
      "Soporte 24/7 VIP",
    ],
    cta: "CONTACTAR",
    ctaStyle: "bg-purple-600 hover:bg-purple-700 text-white",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_ultra_click",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-slate-100/70 -z-20" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight md:whitespace-nowrap">
            Planes que escalan <span className="text-primary-dynamic text-gradient">con tu negocio</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Empezá gratis. Sumá más cuando tu negocio lo pida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="relative bg-white rounded-3xl shadow-md border border-slate-100 p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-md whitespace-nowrap">
                    {plan.highlight}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-7 h-7 ${plan.iconColor}`} />
                </div>

                {/* Plan name */}
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`font-black text-slate-900 ${plan.isCustom ? "text-4xl" : "text-4xl"}`}>
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-slate-400 text-sm font-medium">{plan.priceSuffix}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.cta && plan.href ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent(plan.event)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.ctaStyle}`}
                  >
                    {plan.cta} →
                  </a>
                ) : (
                  <div className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-100" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
