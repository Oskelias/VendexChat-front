import { ArrowRight, Zap, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import AssistantIcon from "../icons/AssistantIcon";
import { trackEvent } from "@/lib/analytics";

const FloatingStat = ({
  icon: Icon,
  value,
  label,
  className,
  delay,
}: {
  icon: typeof Zap;
  value: string;
  label: string;
  className: string;
  delay: string;
}) => (
  <div
    className={`absolute hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl ${className}`}
    style={{ animation: `cta-float 4s ease-in-out ${delay} infinite` }}
  >
    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-sm font-black text-white leading-none">{value}</p>
      <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  </div>
);

const CTASection = () => {
  return (
    <section id="cta" className="relative pt-8 pb-0 md:pt-12 overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950">
      {/* Radial accent overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(16,185,129,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.15),transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-dynamic/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[480px] md:min-h-[520px]">
            {/* Left: Copy */}
            <div className="text-center lg:text-left relative z-10 py-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-white/70 uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Tu vendedor IA te espera
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.95] tracking-tighter">
                Activá tu IA y{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400">
                  dejá de perder ventas
                </span>{" "}
                hoy
              </h2>

              <p className="text-base md:text-lg text-white/50 font-medium mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                En minutos tenés tu catálogo cargado por IA, tu asistente listo
                para atender y tus estadísticas corriendo. Sin tarjeta, sin
                complicaciones.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://admin.vendexchat.app/register"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs uppercase tracking-widest hover:from-emerald-400 hover:to-teal-400 hover:scale-105 hover:shadow-emerald-500/30 active:scale-95 transition-all duration-300 shadow-2xl shadow-emerald-500/20"
                  onClick={() => trackEvent("cta_activate_ia_click")}
                >
                  Activar vendedor IA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  Sin tarjeta de crédito
                </div>
              </div>

              {/* Trust row */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/30">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Setup en 5 min
                  </span>
                </div>
                <div className="w-px h-3 bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Sin código
                  </span>
                </div>
                <div className="w-px h-3 bg-white/15 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <AssistantIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    IA 24/7
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="hidden lg:block relative">
              {/* Floating stats */}
              <FloatingStat
                icon={ShoppingCart}
                value="+340 pedidos"
                label="Este mes"
                className="top-4 -left-6 z-20"
                delay="0s"
              />
              <FloatingStat
                icon={TrendingUp}
                value="+62% ventas"
                label="Último trimestre"
                className="top-1/3 -right-4 z-20"
                delay="1.5s"
              />
              <FloatingStat
                icon={Zap}
                value="2.4s respuesta"
                label="Tiempo promedio"
                className="bottom-24 -left-2 z-20"
                delay="3s"
              />

              {/* Central bot visual */}
              <div className="relative flex items-center justify-center">
                {/* Outer glow ring */}
                <div className="absolute inset-0 m-auto w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 blur-2xl animate-pulse" />

                {/* Ring */}
                <div className="relative w-56 h-56 mx-auto">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-white/10"
                    style={{ animation: "cta-spin 20s linear infinite" }}
                  />
                  <div
                    className="absolute inset-3 rounded-full border border-white/5"
                    style={{ animation: "cta-spin 30s linear infinite reverse" }}
                  />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/logosinfondo.png" alt="VendexChat" className="w-52 h-52 object-contain" />
                  </div>

                  {/* Orbiting dots */}
                  <div
                    className="absolute inset-0"
                    style={{ animation: "cta-spin 8s linear infinite" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ animation: "cta-spin 12s linear infinite reverse" }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes cta-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cta-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
