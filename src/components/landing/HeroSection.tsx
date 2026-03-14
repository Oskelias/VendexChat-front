import { ArrowRight, Play, Zap } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import HeroMockup from "@/components/landing/HeroMockup";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] pt-24 pb-14 md:pt-32 md:pb-20">
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
    </section>
  );
};

export default HeroSection;
