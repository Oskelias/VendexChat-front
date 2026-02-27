import { Check } from "lucide-react";

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
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_pro_click",
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
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_premium_click",
  },
  {
    name: "Business",
    price: "USD 14.99 / mes",
    features: [
      "Todo lo de Premium +",
      "Mensajes emergentes",
      "Cupones de descuento",
      "Productos destacados",
      "Estadísticas avanzadas",
      "Exportar pedidos a Excel",
      "Control de caja",
      "Variante de productos",
      "Límite de compra mínima",
      "Armado de combos",
      "Facebook Pixel",
      "Google Analytics",
    ],
    cta: "Probar Gratis",
    href: "https://admin.vendexchat.app/register",
    event: "pricing_business_click",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-16 lg:py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Precios</p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold text-foreground mb-4 lg:whitespace-nowrap">
            Planes que escalan con tu negocio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground lg:whitespace-nowrap">
            Precios claros y predecibles para cada etapa.
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-3 lg:whitespace-nowrap">
            Empezá gratis. Subí de plan cuando tu negocio crezca.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card p-1 shadow-soft">
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground">
              Mensual
            </button>
            <button className="px-4 py-2 text-sm font-semibold rounded-full text-muted-foreground hover:text-foreground transition-colors">
              Anual
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-9 rounded-2xl border shadow-soft bg-card ${plan.highlight ? "border-primary/50 bg-secondary shadow-elevated" : "border-border"
                }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  {plan.highlight}
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-2xl font-semibold text-foreground">{plan.price}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel={plan.href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => trackEvent(plan.event)}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-[#0D9488] transition-all shadow-soft"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
