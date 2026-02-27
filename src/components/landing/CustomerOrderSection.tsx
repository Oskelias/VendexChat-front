import { Link, ShoppingCart, MessageCircle, Bot } from "lucide-react";

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
  },
  {
    icon: MessageCircle,
    title: "El pedido llega listo a WhatsApp",
    description: "Vos confirmás el pedido, no lo armás.",
  },
];

const CustomerOrderSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-white to-emerald-50/30 -z-10" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <p className="text-[10px] font-black text-primary-dynamic uppercase tracking-[0.3em] mb-4">Proceso de Venta</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
            Un flujo simple que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic to-indigo-600">entienden al instante</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary-dynamic/20 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const isAiStep = index === 2;
            return (
              <div
                key={step.title}
                className={`
                  group relative p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2
                  ${isAiStep
                    ? 'bg-white border-2 border-primary-dynamic/30 shadow-2xl shadow-primary-dynamic/10 active:scale-95'
                    : 'bg-white/70 backdrop-blur-sm border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-white hover:border-primary-dynamic/10'
                  }
                `}
              >
                {isAiStep && (
                  <div className="absolute -top-3 left-10 px-3 py-1 bg-primary-dynamic text-[8px] font-black text-white uppercase tracking-widest rounded-full animate-bounce">
                    Recomendado
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                    ${isAiStep ? 'bg-primary-dynamic text-white shadow-lg shadow-primary-dynamic/30' : 'bg-slate-50 text-primary-dynamic border border-slate-100'}
                  `}>
                    <step.icon className={`w-7 h-7 ${isAiStep ? 'animate-pulse-subtle' : ''}`} />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Paso {index + 1}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-primary-dynamic transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                  "{step.description}"
                </p>

                {/* Decorative dots for connection */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-slate-100 to-transparent -z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomerOrderSection;
