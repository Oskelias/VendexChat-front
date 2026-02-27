import { ShoppingBag, Tag, ClipboardList, Smartphone, Building2, Ban } from "lucide-react";

const features = [
  { icon: Smartphone, title: "Carga Masiva IA", description: "Subí fotos de tus catálogos o listas infinitas. La IA digitaliza cientos de productos con nombre, precio y categoría en segundos." },
  { icon: ShoppingBag, title: "Asistente IA 24/7", description: "Atención automática: tu bot inteligente conoce todo tu stock, responde dudas y guía a tus clientes hasta la venta." },
  { icon: Tag, title: "Organización Automática", description: "La IA clasifica tus productos por categorías lógicas para que tu tienda sea fácil de navegar desde el primer día." },
  { icon: ClipboardList, title: "Gestión Inteligente", description: "Pedidos centralizados que llegan a WhatsApp listos para despachar, con toda la info procesada por IA." },
  { icon: Building2, title: "Estadísticas IA", description: "Entendé tus ventas y recibí recomendaciones inteligentes basadas en tendencias reales de tus clientes." },
  { icon: Ban, title: "Sin Comisiones", description: "Tecnología de punta sin costos ocultos. Tu ganancia es 100% tuya, sin porcentajes por venta." },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-24 md:py-32 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 rounded-l-[5rem]" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Potencia tu Negocio</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Todo lo necesario para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic to-indigo-600">vender sin límites</span>
          </h2>
          <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-dynamic/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary-dynamic group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <f.icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary-dynamic transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {f.description}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-2 text-[10px] font-black text-primary-dynamic uppercase tracking-widest">
                  Saber más <div className="w-4 h-px bg-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
