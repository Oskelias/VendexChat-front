import { ArrowRight, Link, ShoppingCart, MessageCircle, Bot } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const steps = [
  {
    icon: Link,
    title: "El cliente abre el link de tu tienda",
    description: "Funciona en cualquier dispositivo y carga rápido.",
  },
  {
    icon: ShoppingCart,
    title: "Selecciona productos del catálogo",
    description: "Elige ítems, cantidades y extras por su cuenta.",
  },
  {
    icon: Bot,
    title: "Asistente IA lo ayuda a elegir",
    description: "Tu bot inteligente responde dudas y sugiere productos en tiempo real.",
    highlight: true,
  },
  {
    icon: MessageCircle,
    title: "El pedido llega listo a WhatsApp",
    description: "Te llega el pedido por WhatsApp y coordinás los detalles finales con el comprador.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-dynamic/10 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-100/30 rounded-full blur-[150px] animate-pulse-subtle delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-50/40 rounded-full blur-[100px] animate-pulse-subtle delay-700" />
      </div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full -z-10 translate-x-1/2 rotate-12" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[3rem] -z-10 -translate-x-1/2 -rotate-12 animate-float" />

      <div className="container mx-auto px-4 sm:px-6 w-full relative">
        {/* Hero text */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 animate-fade-up shadow-xl shadow-violet-900/30">
            <span className="w-2 h-2 rounded-full bg-primary-dynamic animate-pulse" />
            Tu tienda inteligente en WhatsApp
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] md:leading-[0.95] mb-4 animate-fade-up tracking-tighter"
            style={{ animationDelay: "0.1s" }}
          >
            Vende más <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic via-violet-500 to-indigo-400">sin estar ahí</span>
          </h1>

          <p
            className="text-base md:text-lg text-slate-500 max-w-xl mx-auto mb-6 animate-fade-up font-medium leading-snug"
            style={{ animationDelay: "0.2s" }}
          >
            Transformamos tu WhatsApp en una <span className="text-slate-900 font-bold">terminal de ventas inteligente</span>. Desde digitalizar menús hasta cerrar ventas 24/7.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up mb-6"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="https://admin.vendexchat.app/register"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-primary-dynamic text-white font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary-dynamic/30"
              onClick={() => trackEvent("hero_demo_click")}
            >
              Vender con IA ahora <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#cliente"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all border border-slate-100"
              onClick={() => trackEvent("hero_request_demo_click")}
            >
              Ver Demo Interactiva
            </a>
          </div>

        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl px-6 py-6 shadow-[0_-4px_24px_-4px_rgba(109,40,217,0.08),0_4px_24px_-4px_rgba(0,0,0,0.06)] border border-slate-100/80">
          <p className="text-center text-[10px] font-black text-primary-dynamic uppercase tracking-[0.3em] mb-5">
            Un flujo simple que entienden al instante
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`group relative p-5 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 ${
                  step.highlight
                    ? "bg-white border-2 border-primary-dynamic/30 shadow-2xl shadow-primary-dynamic/10"
                    : "bg-white/70 backdrop-blur-sm border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-white hover:border-primary-dynamic/10"
                }`}
              >
                {step.highlight && (
                  <div className="absolute -top-3 left-8 px-3 py-1 bg-primary-dynamic text-[8px] font-black text-white uppercase tracking-widest rounded-full animate-bounce">
                    IA activa
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    step.highlight
                      ? "bg-primary-dynamic text-white shadow-lg shadow-primary-dynamic/30"
                      : "bg-slate-50 text-primary-dynamic border border-slate-100"
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">0{index + 1}</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2 leading-tight group-hover:text-primary-dynamic transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {step.description}
                </p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-slate-200 to-transparent -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
