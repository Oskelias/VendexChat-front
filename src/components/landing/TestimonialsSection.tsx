import { BadgeCheck, Building2, Star } from "lucide-react";

const testimonials = [
  {
    name: "Morfi Viandas",
    role: "Viandas saludables",
    location: "Buenos Aires",
    logo: "MV",
    color: "bg-emerald-600",
    stars: 5,
    text: "Antes tomábamos pedidos por WhatsApp de forma desordenada y se nos mezclaban horarios y menús. Ahora el cliente elige solo desde la tienda, el bot resuelve dudas y a cocina le llega todo mucho más claro.",
  },
  {
    name: "Central Tienda de Bebidas",
    role: "Bebidas y combos",
    location: "Palermo",
    logo: "CB",
    color: "bg-blue-600",
    stars: 5,
    text: "En hora pico nos explotaban las consultas de stock y promos. Con VendexChat los clientes ven el catálogo actualizado y preguntan menos; nosotros nos enfocamos en preparar y despachar más rápido.",
  },
  {
    name: "Mundo Electrónico",
    role: "Ecommerce de electrónica",
    location: "Online",
    logo: "ME",
    color: "bg-violet-600",
    stars: 5,
    text: "Tenemos muchos SKU y actualizar precios era eterno. El importador IA nos ahorró horas y el asistente responde preguntas técnicas básicas antes de que intervenga el equipo.",
  },
  {
    name: "Distribuidora de Bebidas Humahuaca",
    role: "Distribución mayorista y minorista",
    location: "Humahuaca",
    logo: "DH",
    color: "bg-amber-600",
    stars: 5,
    text: "Pasamos de anotar pedidos en varios chats a tener un flujo ordenado por zonas y horarios. Se redujeron los errores de entrega y mejoró mucho el seguimiento diario.",
  },
  {
    name: "Era para vos",
    role: "Indumentaria femenina",
    location: "Córdoba",
    logo: "EV",
    color: "bg-pink-600",
    stars: 5,
    text: "Con los cambios de temporada necesitábamos mover rápido catálogo y promos. Ahora publicamos novedades en minutos y el bot guía mejor a las clientas entre talles y modelos.",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="relative py-16 md:py-24 overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-white -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-50/60 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-black text-amber-600 uppercase tracking-widest mb-5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            Lo que dicen nuestros clientes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4 md:whitespace-nowrap">
            Negocios reales,{" "}
            <span className="text-primary-dynamic text-gradient">resultados reales</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Cinco clientes activos de distintos rubros que ya operan con VendexChat.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-100/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
            >
              {/* Quote mark */}
              <span className="absolute top-5 right-6 text-5xl font-black text-slate-100 leading-none select-none">"</span>

              <Stars count={t.stars} />

              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                "{t.text}"
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                  {t.logo}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.role} · {t.location}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  <Building2 className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-black text-slate-600 tracking-wide">Logo {t.logo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "Casos reales", label: "de rubros distintos" },
            { value: "Implementación simple", label: "sin fricción operativa" },
            { value: "Soporte cercano", label: "en cada etapa" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-sm md:text-base font-black text-slate-900 flex items-center gap-1 justify-center"><BadgeCheck className="w-4 h-4 text-primary-dynamic" />{stat.value}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
