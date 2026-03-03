import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Tienda de ropa",
    location: "Córdoba",
    avatar: "MG",
    color: "bg-violet-600",
    stars: 5,
    text: "Antes perdía pedidos porque no daba abasto con los mensajes. Ahora el bot responde solo y yo me enfoco en preparar los paquetes. Vendí el doble en el primer mes.",
  },
  {
    name: "Lucas Ferreyra",
    role: "Rotisería",
    location: "Rosario",
    avatar: "LF",
    color: "bg-blue-600",
    stars: 5,
    text: "El menú digital por QR fue un cambio enorme. Los clientes eligen solos, pagan y ya. Casi no tengo que atender el teléfono a la hora pico.",
  },
  {
    name: "Sofía Martínez",
    role: "Perfumería online",
    location: "Buenos Aires",
    avatar: "SM",
    color: "bg-emerald-600",
    stars: 5,
    text: "Lo que más me gustó es que subí todo el catálogo con fotos y el sistema lo cargó solo con la IA. Me ahorró horas de trabajo y quedó perfecto.",
  },
  {
    name: "Rodrigo Paz",
    role: "Ferretería",
    location: "Mendoza",
    avatar: "RP",
    color: "bg-amber-600",
    stars: 5,
    text: "Tengo más de 500 productos y nunca pensé que iba a poder tenerlos en línea. Con VENDExChat armé el catálogo en un día. Los pedidos llegaban solos.",
  },
  {
    name: "Carolina Vidal",
    role: "Pastelería artesanal",
    location: "La Plata",
    avatar: "CV",
    color: "bg-pink-600",
    stars: 5,
    text: "Mis clientas piden por WhatsApp y el bot les muestra las tortas, los precios y les confirma la entrega. Yo solo me encargo de hornear. Increíble.",
  },
  {
    name: "Tomás Ibáñez",
    role: "Electrónica",
    location: "Tucumán",
    avatar: "TI",
    color: "bg-cyan-600",
    stars: 5,
    text: "El control de stock en tiempo real me salvó de vender productos que no tenía. Y el reporte semanal me dice qué se vende más. Muy completo.",
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
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Negocios reales,{" "}
            <span className="text-primary-dynamic text-gradient">resultados reales</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Miles de comercios en Argentina ya venden más con VENDExChat.
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
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "5.000+", label: "comercios activos" },
            { value: "4.9 / 5", label: "valoración promedio" },
            { value: "98%", label: "clientes satisfechos" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
