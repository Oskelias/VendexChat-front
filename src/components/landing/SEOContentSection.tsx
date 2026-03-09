import { MessageSquare, Layout, QrCode, Zap } from "lucide-react";

const SEOContentSection = () => {
  const content = [
    {
      icon: MessageSquare,
      title: "Ventas por WhatsApp sin fricción",
      text: "VendexChat permite tomar pedidos por WhatsApp para restaurantes con un flujo claro: el cliente ve el catálogo, elige y el pedido llega listo para confirmar."
    },
    {
      icon: Zap,
      title: "Optimizado para micro-negocios",
      text: "Es ideal para negocios chicos que venden por chat y necesitan ordenar sus pedidos sin perder tiempo ni ventas."
    },
    {
      icon: Layout,
      title: "Catálogo digital de alto impacto",
      text: "Con un catálogo digital para tiendas locales, cada producto tiene su precio y descripción, listo para que el cliente compre sin preguntar de nuevo."
    },
    {
      icon: QrCode,
      title: "Menú QR para experiencias físicas",
      text: "Además, el menú QR para restaurantes facilita que los clientes consulten el menú desde la mesa y pidan en minutos, eliminando esperas."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-[10px] font-black text-primary-dynamic uppercase tracking-[0.3em] mb-4 text-center">Contenido & SEO</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center tracking-tight">
              Vendé por WhatsApp <span className="text-primary-dynamic">sin caos</span>
            </h2>
            <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full" />
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {content.map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary-dynamic" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight uppercase tracking-wider">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed leading-relaxed text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;
