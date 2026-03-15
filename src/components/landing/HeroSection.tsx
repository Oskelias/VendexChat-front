import { ArrowRight, BadgeCheck, MessageCircle, Play, ShieldCheck, Zap } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import HeroMockup from "@/components/landing/HeroMockup";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] pt-24 pb-0 md:pt-32">
      <div className="absolute inset-0 -z-20">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute top-20 right-8 h-[28rem] w-[28rem] rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 text-xs font-bold text-emerald-700">
              <Zap className="h-4 w-4" />
              Tu negocio organizado con herramientas de IA, tu tiempo es lo más valioso
            </div>

            <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Crea tu catálogo,{" "}
              automatizá tu tienda{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-violet-600 bg-clip-text text-transparent">
                y vendé 24/7 con IA
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 lg:mx-0">
              Catálogo web con IA, panel automatizado y un Asistente en tu página que vende por vos. Todo en un solo lugar.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="https://admin.vendexchat.app/register"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-dynamic px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                onClick={() => trackEvent("hero_demo_click")}
              >
                Probar gratis <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#cliente"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-slate-300/30 transition hover:bg-slate-50 sm:w-auto"
                onClick={() => trackEvent("hero_request_demo_click")}
              >
                <Play className="h-4 w-4 fill-current" /> Ver demo interactiva
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroMockup />
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mt-14 md:mt-20 border-t border-slate-200/70 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">Sin comisiones</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Cada venta es 100% tuya</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">Pedidos por WhatsApp</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Directo a tu celular, sin intermediarios</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">Listo en minutos</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Sin saber programar, sin técnicos</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 leading-none">Plan gratis para siempre</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Empezá sin tarjeta de crédito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
