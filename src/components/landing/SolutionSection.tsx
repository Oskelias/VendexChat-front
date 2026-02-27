import { ArrowRight, ShoppingBag, List, Send } from "lucide-react";

const SolutionSection = () => {
  return (
    <section id="solucion" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-slate-50/50 -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dynamic/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[10px] font-black text-primary-dynamic uppercase tracking-[0.3em] mb-4">La Solución Integral</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Pedidos organizados, <br />
            <span className="text-primary-dynamic">automáticamente</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            VendexChat convierte el caos de los chats informales en un flujo de trabajo
            <span className="text-slate-900 font-bold"> profesional y escalable.</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 max-w-6xl mx-auto mb-24">
          {[
            { icon: ShoppingBag, label: "IA crea tu tienda con una foto", color: "bg-indigo-600 text-white shadow-indigo-100" },
            { icon: List, label: "IA atiende y vende por vos", color: "bg-primary-dynamic text-white shadow-emerald-100" },
            { icon: Send, label: "Recibís el pedido organizado", color: "bg-slate-900 text-white shadow-slate-100" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8 flex-col md:flex-row group">
              <div className="flex flex-col items-center gap-6 px-4 transition-transform duration-500 group-hover:scale-105">
                <div className={`w-20 h-20 rounded-[2rem] ${step.color} flex items-center justify-center shadow-2xl relative transition-all duration-500 group-hover:rotate-6`}>
                  <div className="absolute inset-0 rounded-[2rem] bg-current opacity-20 blur-xl animate-pulse-subtle" />
                  <step.icon className="w-8 h-8 relative z-10" />
                </div>
                <span className="text-xs font-black text-slate-700 text-center max-w-[160px] uppercase tracking-wider leading-relaxed">{step.label}</span>
              </div>
              {i < 2 && (
                <div className="hidden md:flex items-center">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-slate-200 to-transparent" />
                  <ArrowRight className="w-5 h-5 text-slate-300 -ml-2" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-dynamic to-indigo-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
          <div className="relative rounded-[3rem] bg-white border border-slate-100 p-12 md:p-16 shadow-2xl shadow-slate-200/50">
            <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="pt-8 md:pt-0">
                <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">0%</div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comisiones por pedido</p>
              </div>
              <div className="pt-12 md:pt-0 md:px-8">
                <div className="text-5xl font-black text-primary-dynamic mb-2 tracking-tighter">24/7</div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IA Siempre conectada</p>
              </div>
              <div className="pt-12 md:pt-0 md:pl-8">
                <div className="text-5xl font-black text-indigo-600 mb-2 tracking-tighter">~2min</div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Onboarding Express</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
