import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 md:py-32 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-dynamic/10 rounded-full blur-[120px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-100/30 rounded-full blur-[150px] animate-pulse-subtle delay-1000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-50/40 rounded-full blur-[100px] animate-pulse-subtle delay-700" />
      </div>

      <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full -z-10 translate-x-1/2 rotate-12" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[3rem] -z-10 -translate-x-1/2 -rotate-12 animate-float" />

      <div className="container mx-auto px-4 sm:px-6 w-full relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-up shadow-xl shadow-violet-900/30">
            <span className="w-2 h-2 rounded-full bg-primary-dynamic animate-pulse" />
            La Revolución del Inbox con IA
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] mb-8 animate-fade-up tracking-tighter"
            style={{ animationDelay: "0.1s" }}
          >
            Vende más <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic via-violet-500 to-indigo-400">sin estar ahí</span>
          </h1>

          <p
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 animate-fade-up font-medium leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Transformamos tu WhatsApp en una
            <span className="text-slate-900 font-bold"> terminal de ventas inteligente</span>.
            Desde digitalizar menús hasta cerrar ventas 24/7: la IA se encarga de todo el ruido.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up mb-12"
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

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
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
      </div>
    </section>
  );
};

export default HeroSection;
