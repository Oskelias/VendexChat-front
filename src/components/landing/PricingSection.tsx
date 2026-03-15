import { useState } from "react";
import { Check, Shield, Zap, Crown } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "FREE",
      monthlyPrice: "$0",
      annualPrice: "$0.00",
      priceSuffix: "/ mes",
      icon: Shield,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-400",
      descriptionBox: "Ideal para validar tu idea y captar tus primeros pedidos sin costo.",
      features: [
        "2 Categorías",
        "10 Productos por cat.",
        "Menú Digital QR",
        "Pedidos por WhatsApp",
      ],
      highlightedFeatures: [],
      cta: "SUSCRIBIRSE",
      ctaStyle: "bg-slate-100 hover:bg-slate-200 text-slate-400 cursor-default",
      href: "https://admin.vendexchat.app/register",
      event: "pricing_free_click",
    },
    {
      name: "PRO",
      monthlyPrice: "$13.99",
      annualPrice: "$11.66",
      annualTotal: "$139.9",
      annualSavings: "$27.98",
      priceSuffix: "/ mes",
      icon: Zap,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      description: "Todo lo que necesitás para crecer y vender más. Incluye Asistente de Ventas IA.",
      descriptionBox: "Ahorra tiempo operativo y aumenta conversión con IA y automatización comercial.",
      features: [
        "Categorías Ilimitadas",
        "Productos Ilimitados",
        "Dominios Personalizados",
        "Estadísticas de Venta",
      ],
      highlightedFeatures: [
        "Importador masivo con IA: con un click cargás todos los productos a tu catálogo",
        "Asistente de Ventas IA",
      ],
      cta: "SUSCRIBIRSE",
      ctaStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
      href: "https://admin.vendexchat.app/register",
      event: "pricing_premium_click",
    },
    {
      name: "VIP",
      monthlyPrice: "$19.99",
      annualPrice: "$16.66",
      annualTotal: "$199.9",
      annualSavings: "$39.98",
      priceSuffix: "/ mes",
      icon: Crown,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      highlight: "RECOMENDADO",
      description: "Automatizá tu operación con IA, logística y soporte dedicado.",
      descriptionBox: "Reduce tareas manuales, acelera entregas y mejora recompra con CRM + logística + bot IA.",
      diferencial: [
        "Seguimiento postventa y reactivación de clientes desde CRM IA.",
        "Operación más ágil: bot + logística + soporte prioritario en un solo plan.",
      ],
      features: [
        "Todo lo del plan Pro",
        "VENDEx Bot con IA",
        "Logística Integrada",
        "CRM con IA & Analítica",
        "Soporte Prioritario",
      ],
      highlightedFeatures: [],
      cta: "SUSCRIBIRSE",
      ctaStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
      href: "https://admin.vendexchat.app/register",
      event: "pricing_vip_click",
    },
    {
      name: "ULTRA",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      priceSuffix: null,
      isCustom: true,
      icon: Zap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      description: "Solución empresarial a medida con infraestructura propia.",
      descriptionBox: "Escala con soporte dedicado e implementación estratégica a medida.",
      features: [
        "Desarrollo a Medida",
        "Web & Hosting Propio",
        "Bots & Automatizaciones",
        "Consultoría Estratégica",
        "Soporte 24/7 VIP",
      ],
      highlightedFeatures: [],
      cta: "CONTACTAR",
      ctaStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      href: "https://wa.me/5491165689145?text=" + encodeURIComponent("Hola! Me interesa el plan ULTRA de VENDExChat. Quisiera información sobre el desarrollo a medida."),
      event: "pricing_ultra_click",
    },
  ];

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

        {/* Billing toggle */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                !isAnnual
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Mensual
            </button>
            <div className="relative">
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                  isAnnual
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Anual
              </button>
              <span className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
                -15%
              </span>
            </div>
          </div>
          <p className="text-emerald-600 text-sm font-semibold">
            Plan anual recomendado: ahorrás hasta 2 meses por año frente al pago mensual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
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
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-1">
                  {plan.name}
                </h3>

                {/* Description */}
                {plan.description && (
                  <p className="text-slate-400 text-xs font-medium mb-3 leading-relaxed">
                    {plan.description}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  {!plan.isCustom && displayPrice !== "$0" && displayPrice !== "$0.00" && (
                    <span className="text-slate-400 text-sm font-semibold mr-0.5">USD</span>
                  )}
                  <span className={`font-black text-slate-900 ${plan.isCustom ? "text-4xl" : "text-4xl"}`}>
                    {displayPrice}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-slate-400 text-sm font-medium">{plan.priceSuffix}</span>
                  )}
                </div>

                {/* Annual billing info */}
                {isAnnual && plan.annualTotal && (
                  <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                    <p className="text-emerald-700 text-[11px] font-black uppercase tracking-wide mb-0.5">
                      Facturado anualmente ({plan.annualTotal})
                    </p>
                    <p className="text-emerald-600 text-[11px] font-medium leading-snug">
                      Equivale a USD {plan.annualPrice}/mes · Ahorrás USD {plan.annualSavings} al año.
                    </p>
                  </div>
                )}

                {/* Description box */}
                {plan.descriptionBox && (
                  <div className="mb-4 rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2.5">
                    <p className="text-indigo-700 text-xs font-medium leading-relaxed">
                      {plan.descriptionBox}
                    </p>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlighted features */}
                {plan.highlightedFeatures && plan.highlightedFeatures.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {plan.highlightedFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2.5">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-indigo-600" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-indigo-700 font-semibold leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* DIFERENCIAL VIP */}
                {"diferencial" in plan && plan.diferencial && (
                  <div className="mb-4 rounded-xl bg-orange-50 border border-orange-200 px-3 py-2.5">
                    <p className="text-orange-600 text-[11px] font-black uppercase tracking-wide mb-1.5">
                      Diferencial VIP
                    </p>
                    <ul className="space-y-1">
                      {plan.diferencial.map((item, idx) => (
                        <li key={idx} className="text-orange-700 text-xs font-medium leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-4">
                  {plan.href ? (
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
