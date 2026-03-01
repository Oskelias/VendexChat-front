import { Store, Upload, Bot, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Store,
    step: "01",
    title: "Creá tu cuenta",
    description: "Configurá tu negocio y marca en segundos. Sin tecnicismos, sin complicaciones.",
  },
  {
    icon: Upload,
    step: "02",
    title: "La IA arma tu catálogo",
    description: "Subí una foto de tu menú o lista de precios. La IA crea todos tus productos con nombre, precio y categoría al instante.",
  },
  {
    icon: Bot,
    step: "03",
    title: "Activá tu vendedor IA",
    description: "Tu asistente inteligente empieza a atender clientes, responder dudas y cerrar ventas solo — las 24 horas.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Crecé con datos reales",
    description: "La IA analiza tus ventas y te da insights accionables para que tomes mejores decisiones cada día.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 bg-background scroll-mt-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-dynamic/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[10px] font-black text-primary-dynamic uppercase tracking-[0.3em] mb-4">Cómo funciona</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            De cero a ventas <br />
            <span className="text-primary-dynamic">automáticas en minutos</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Sin necesidad de conocimientos técnicos. La IA hace el trabajo pesado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={i}
              className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-dynamic/10 transition-all duration-500 hover:-translate-y-1"
            >
              <span className="text-6xl font-black text-slate-50 absolute top-6 right-6 select-none group-hover:text-primary-dynamic/10 transition-colors leading-none">
                {s.step}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary-dynamic group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <s.icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight group-hover:text-primary-dynamic transition-colors">{s.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
