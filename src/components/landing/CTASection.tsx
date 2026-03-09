import { ArrowRight, Bot } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-16 md:py-20 overflow-hidden scroll-mt-28">
      {/* Intense gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-950 -z-20" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.12),transparent)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3.5rem] bg-white border border-slate-100 p-12 md:p-20 shadow-2xl overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-dynamic/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-dynamic/10 transition-colors duration-1000" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-dynamic animate-pulse" />
                  Tu vendedor IA te espera
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tighter">
                  Activá tu IA y <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic to-violet-400">dejá de perder ventas</span> hoy
                </h2>
                <p className="text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto lg:mx-0">
                  En minutos tenés tu catálogo cargado por IA, tu asistente listo para atender y tus estadísticas corriendo. Sin tarjeta, sin complicaciones.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://admin.vendexchat.app/register"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-900/30"
                    onClick={() => trackEvent("cta_activate_ia_click")}
                  >
                    Activar vendedor IA <ArrowRight className="w-5 h-5" />
                  </a>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Sin tarjeta de crédito
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="absolute -inset-4 bg-primary-dynamic/5 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-full aspect-square rounded-[3rem] bg-slate-50 border border-slate-100 shadow-inner flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-1000 overflow-hidden">
                  <div className="p-12 text-center group">
                    <Bot className="w-20 h-20 text-primary-dynamic mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                    <div className="text-2xl font-black text-slate-900 tracking-tighter mb-2">IA Vendex activa</div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Vendiendo mientras descansás</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
