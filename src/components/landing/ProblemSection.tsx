import { Clock, HelpCircle, MessageSquareX, Repeat } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Carga manual interminable",
    description: "Subir cientos de productos uno por uno es una pérdida de tiempo total.",
  },
  {
    icon: Repeat,
    title: "Consultas repetitivas",
    description: "¿Tienen stock? ¿Precio? Respondés lo mismo 50 veces al día.",
  },
  {
    icon: MessageSquareX,
    title: "Pedidos perdidos en el chat",
    description: "Entre audios y texto, el pedido se mezcla y cometés errores.",
  },
  {
    icon: HelpCircle,
    title: "Negocio cerrado si no respondés",
    description: "Si no estás pegado al celular, perdés ventas cada minuto.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problema" className="relative py-24 md:py-32 bg-slate-900 overflow-hidden scroll-mt-20">
      {/* Abstract dark elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.05),transparent)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-4">El Desafío Actual</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Tu WhatsApp no fue <br />
            <span className="text-slate-400">diseñado para vender</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            "Cada día, miles de negocios <span className="text-red-400 font-bold">pierden ventas</span> por intentar tomar pedidos de forma manual y caótica."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group relative p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 hover:bg-slate-800/60"
            >
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                  <problem.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-red-400 transition-colors">{problem.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{problem.description}</p>
                </div>
              </div>

              {/* Subtle danger indicator */}
              <div className="absolute bottom-6 right-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <div className="text-[8px] font-black uppercase text-red-500">Crítico</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 py-3 px-6 rounded-full bg-red-500/5 border border-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Impacto directo en tu facturación mensual
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
