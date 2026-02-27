import { ArrowRight, MessageCircle, Package, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const heroSlides = [
  {
    title: "Carga IA",
    subtitle: "Importación Mágica",
    overlay: "Subí la foto de tu menú y la IA crea los productos con precio y foto en segundos.",
    type: "ai_importer",
  },
  {
    title: "Ventas IA",
    subtitle: "Atención 24/7",
    overlay: "Tu asistente inteligente responde consultas y cierra ventas en automático.",
    type: "ai_assistant",
  },
  {
    title: "Analítica IA",
    subtitle: "Datos que vendsn",
    overlay: "Entendé tus ventas y recibí sugerencias inteligentes para crecer.",
    type: "ai_stats",
  },
  {
    title: "WhatsApp Pro",
    subtitle: "Pedidos limpios",
    overlay: "Recibí los pedidos ya organizados y confirmados lista para despachar.",
    type: "message",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 md:py-32 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-dynamic/10 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/30 rounded-full blur-[150px] animate-pulse-subtle delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-50/40 rounded-full blur-[100px] animate-pulse-subtle delay-700" />
      </div>

      {/* Abstract Glassmorphism Shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full -z-10 translate-x-1/2 rotate-12" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[3rem] -z-10 -translate-x-1/2 -rotate-12 animate-float" />

      <div className="container mx-auto px-4 sm:px-6 w-full relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-up shadow-xl shadow-slate-900/20">
              <span className="w-2 h-2 rounded-full bg-primary-dynamic animate-pulse" />
              La Revolución del Inbox con IA
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] mb-8 animate-fade-up tracking-tighter"
              style={{ animationDelay: "0.1s" }}
            >
              Vende más <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic via-indigo-600 to-emerald-500">sin estar ahí</span>
            </h1>

            <p
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 mb-10 animate-fade-up font-medium leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Transformamos tu WhatsApp en una
              <span className="text-slate-900 font-bold"> terminal de ventas inteligente</span>.
              Desde digitalizar menús hasta cerrar ventas 24/7: la IA se encarga de todo el ruido.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up mb-12"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="https://admin.vendexchat.app/register"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-primary-dynamic text-white font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary-dynamic/30"
                onClick={() => trackEvent("hero_demo_click")}
              >
                Vender con IA ahora <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#ia-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all border border-slate-100"
                onClick={() => trackEvent("hero_request_demo_click")}
              >
                Ver Demo Interactiva
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-black text-xs text-slate-900 uppercase tracking-tighter italic">
                <span className="text-primary-dynamic not-italic">★</span> Multi-Tenant ready
              </div>
              <div className="flex items-center gap-2 font-black text-xs text-slate-900 uppercase tracking-tighter italic">
                <span className="text-primary-dynamic not-italic">★</span> WhatsApp API
              </div>
              <div className="flex items-center gap-2 font-black text-xs text-slate-900 uppercase tracking-tighter italic">
                <span className="text-primary-dynamic not-italic">★</span> Supabase Cloud
              </div>
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
                        <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground font-bold">VENDEX AI</span>
                        <span>{slide.subtitle}</span>
                      </div>

                      {slide.type === "ai_importer" && (
                        <div className="mt-4 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-full aspect-video rounded-xl bg-muted flex flex-col items-center justify-center border-2 border-dashed border-primary/30 p-4">
                            <ShoppingBag className="w-8 h-8 text-primary mb-2 animate-bounce" />
                            <p className="text-xs font-medium italic">"Procesando foto de tu menú..."</p>
                          </div>
                          <div className="w-full space-y-2">
                            <div className="h-8 rounded-lg bg-white border border-border p-2 flex items-center gap-2">
                              <span className="w-4 h-4 rounded bg-primary/20" />
                              <div className="h-2 w-24 bg-muted rounded" />
                            </div>
                            <div className="h-8 rounded-lg bg-white border border-border p-2 flex items-center gap-2">
                              <span className="w-4 h-4 rounded bg-primary/20" />
                              <div className="h-2 w-20 bg-muted rounded" />
                            </div>
                          </div>
                        </div>
                      )}

                      {slide.type === "ai_assistant" && (
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-muted px-3 py-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            ¿Cuál es la diferencia entre el Combo 1 y 2?
                          </div>
                          <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 border border-primary/20 px-3 py-2 ml-auto text-foreground">
                            <span className="block font-bold text-[10px] text-primary mb-1">IA VENDEX:</span>
                            El Combo 1 trae papas chicas, mientras que el 2 es con papas grandes y bebida. ¿Te gustaría sumar el Combo 2?
                          </div>
                          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            ¡Dale! Agregame el 2.
                          </div>
                          <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 border border-primary/20 px-3 py-2 ml-auto text-foreground">
                            Perfecto. Agregado al carrito. ¿Algo más? 🍟
                          </div>
                        </div>
                      )}

                      {slide.type === "ai_stats" && (
                        <div className="mt-4 space-y-4">
                          <div className="flex gap-2">
                            <div className="flex-1 h-24 rounded-xl bg-primary/10 p-3 flex flex-col justify-between">
                              <span className="text-[10px] text-primary font-bold">VENTAS</span>
                              <span className="text-xl font-bold font-display">+24%</span>
                            </div>
                            <div className="flex-1 h-24 rounded-xl bg-accent p-3 flex flex-col justify-between">
                              <span className="text-[10px] text-accent-foreground font-bold font-display">IA INSIGHT</span>
                              <span className="text-[10px] italic leading-tight">"Subí el stock de Empanadas, es tendencia hoy"</span>
                            </div>
                          </div>
                          <div className="h-32 rounded-xl border border-border bg-white shadow-soft p-3 flex items-end gap-1">
                            {[30, 60, 45, 90, 75, 50, 85].map((h, i) => (
                              <div key={i} className="flex-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {slide.type === "message" && (
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted px-3 py-2">
                            <span className="block font-bold mb-1">PEDIDO #2041 ARMADO</span>
                            1x Combo 2 (Papas Grandes)
                            <br />
                            Total: $12.500
                            <br />
                            Pago: Transferencia
                          </div>
                          <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary/10 px-3 py-2 ml-auto text-foreground">
                            ¡Recibido! En 30 minutos lo tenés allá.
                          </div>
                        </div>
                      )}

                      <div className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-xs text-foreground font-medium">
                        {slide.overlay}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>LA PRIMERA APP IA-FIRST</span>
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
                { label: "Importer IA", icon: Package },
                { label: "Asistente IA", icon: MessageCircle },
                { label: "Insights IA", icon: User },
                { label: "WhatsApp Ready", icon: ShoppingBag },
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
