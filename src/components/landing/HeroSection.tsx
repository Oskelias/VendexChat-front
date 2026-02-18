import { ArrowRight, MessageCircle, Package, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const heroSlides = [
  {
    title: "Antes",
    subtitle: "WhatsApp desordenado",
    overlay: "Mensajes sueltos, dudas y pedidos mezclados.",
    type: "chat",
  },
  {
    title: "Catálogo VendexChat",
    subtitle: "Stock claro",
    overlay: "Productos visibles con estados disponibles o pausados.",
    type: "catalog",
  },
  {
    title: "Armar pedido",
    subtitle: "Carrito completo",
    overlay: "Cantidades, total, zona y método de pago.",
    type: "cart",
  },
  {
    title: "Pedido listo",
    subtitle: "Resumen final",
    overlay: "Todo listo para enviar con un solo toque.",
    type: "summary",
  },
  {
    title: "WhatsApp",
    subtitle: "Mensaje armado",
    overlay: "El pedido llega prearmado para confirmar.",
    type: "message",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-16 lg:py-20 hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              La nueva forma de vender por WhatsApp
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-display font-bold text-foreground leading-[1.05] mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Sistema de pedidos por WhatsApp para{" "}
              <span className="text-gradient">negocios</span>{" "}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block">Creá tu tienda en pocos minutos, administrá tu stock, tus clientes eligen los productos desde tu web personalizada, recibís el pedido por WhatsApp.</span>
              <span className="block mt-3 font-semibold text-foreground">Sencillo, sin vueltas, sin comisiones.</span>
            </p>
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="/morfi-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-[#0D9488] transition-all shadow-elevated hover:shadow-card"
                onClick={() => trackEvent("hero_demo_click")}
              >
                Ver demo en vivo <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://admin.vendexchat.app/register"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-white text-foreground font-semibold text-lg shadow-soft hover:shadow-card transition-all border border-border"
                onClick={() => trackEvent("hero_request_demo_click")}
              >
                Probar Gratis
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/80 shadow-soft p-6 md:p-8 animate-fade-up order-1 lg:order-2" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-[2.5rem] border border-border bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-card p-3">
              <div className="relative h-[420px] sm:h-[520px] overflow-hidden rounded-[2rem] bg-background">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.title}
                    className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div className="h-full w-full flex flex-col justify-between p-5 sm:p-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{slide.title}</span>
                        <span>{slide.subtitle}</span>
                      </div>
                      {slide.type === "chat" && (
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            ¿Qué te queda hoy?
                          </div>
                          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            ¿Precio de la promo?
                          </div>
                          <div className="max-w-[70%] rounded-2xl rounded-tr-md bg-primary/10 px-3 py-2 ml-auto text-foreground">
                            Te confirmo en un momento.
                          </div>
                          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            Quiero 2 combos, 1 sin queso.
                          </div>
                        </div>
                      )}
                      {slide.type === "catalog" && (
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-foreground">
                          {[
                            { name: "Milanesa", status: "Disponible" },
                            { name: "Empanadas", status: "Disponible" },
                            { name: "Ensalada", status: "Pausado" },
                            { name: "Sándwich", status: "Disponible" },
                          ].map((item) => (
                            <div key={item.name} className="rounded-2xl border border-border/70 bg-white px-3 py-3 shadow-soft">
                              <p className="text-sm font-semibold">{item.name}</p>
                              <span
                                className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${item.status === "Disponible" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                  }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {slide.type === "cart" && (
                        <div className="mt-4 space-y-3 text-sm text-foreground">
                          {[
                            { name: "Milanesa completa", price: "$7.900", qty: "x1" },
                            { name: "Empanadas x12", price: "$6.800", qty: "x2" },
                          ].map((item) => (
                            <div key={item.name} className="flex items-center justify-between rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-soft">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{item.qty}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">{item.price}</span>
                            </div>
                          ))}
                          <div className="rounded-2xl border border-border/70 bg-secondary px-4 py-3 text-xs text-foreground font-semibold">
                            Total $21.500 · Zona: Caballito · Pago: Efectivo
                          </div>
                        </div>
                      )}
                      {slide.type === "summary" && (
                        <div className="mt-4 space-y-3 text-sm text-foreground">
                          <div className="rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-soft">
                            <p className="font-semibold">Resumen del pedido</p>
                            <p className="text-xs text-muted-foreground">3 productos · Total $21.500</p>
                          </div>
                          <div className="rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-soft">
                            <p className="font-semibold">Entrega</p>
                            <p className="text-xs text-muted-foreground">Av. Rivadavia 1234 · 30 min</p>
                          </div>
                          <button className="w-full rounded-2xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground">
                            Enviar por WhatsApp
                          </button>
                        </div>
                      )}
                      {slide.type === "message" && (
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            Pedido #1542
                            <br />
                            2x Empanadas · 1x Milanesa
                            <br />
                            Total: $21.500
                          </div>
                          <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary/10 px-3 py-2 ml-auto text-foreground">
                            ¿Confirmás para las 21:00?
                          </div>
                        </div>
                      )}
                      <div className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-xs text-foreground font-medium">
                        {slide.overlay}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Demo VendexChat</span>
                        <span>{index + 1} / {heroSlides.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Slide anterior"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <div className="flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${activeSlide === index ? "w-6 bg-primary" : "w-2.5 bg-muted"
                      }`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Slide siguiente"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              {[
                { label: "Cliente", icon: User },
                { label: "Catálogo online", icon: ShoppingBag },
                { label: "Pedido", icon: Package },
                { label: "Confirmación WhatsApp", icon: MessageCircle },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground whitespace-nowrap">{item.label}</span>
                  {index < 3 && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
