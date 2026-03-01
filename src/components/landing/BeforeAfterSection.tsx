import { X, Check } from "lucide-react";

const competitorItems = [
  "Cargás los productos uno por uno a mano",
  "Vos tenés que responder cada consulta",
  "Sin análisis ni recomendaciones de venta",
  "Pedidos que igual llegan desordenados",
  "Cerrado cuando no estás disponible",
];

const vendexItems = [
  "IA digitaliza tu catálogo con una foto",
  "Bot IA atiende y cierra ventas solo, 24/7",
  "Insights IA para vender más cada día",
  "Pedidos confirmados y organizados automáticamente",
  "Tu negocio vende aunque estés durmiendo",
];

const BeforeAfterSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50/50 overflow-hidden scroll-mt-28">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[10px] font-black text-violet-600 uppercase tracking-[0.3em] mb-4">Por qué cambiarse</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
            ¿Ya usás otra herramienta? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dynamic to-violet-500">Esto cambia todo</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            La mayoría de las herramientas solo ordenan pedidos. VendexChat los <span className="text-slate-900 font-bold">genera y cierra con IA</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Competitor */}
          <div className="group p-10 rounded-[2.5rem] bg-slate-800/5 border border-slate-200 shadow-xl shadow-slate-200/40 transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Lo que ofrecen los demás</span>
                <h3 className="text-2xl font-black text-slate-600 tracking-tight">Herramientas tradicionales</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                <X className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Chat mockup - manual */}
            <div className="rounded-[1.5rem] bg-white border border-slate-100 shadow-inner p-5 mb-8">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="font-bold">WhatsApp Business</span>
                <span>12:42</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-slate-600">
                  ¿Me mandás el menú?
                </div>
                <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-slate-200 px-3 py-2 ml-auto text-slate-500 text-xs italic">
                  [foto de imagen del menú]
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-slate-600">
                  ¿Y el precio del combo 2?
                </div>
                <div className="text-[10px] text-slate-300 text-right italic">Esperando respuesta...</div>
              </div>
            </div>

            <ul className="space-y-4">
              {competitorItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-500 leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VendexChat IA */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white border border-primary-dynamic/20 shadow-2xl shadow-primary-dynamic/10 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-primary-dynamic text-[9px] font-black text-white uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary-dynamic/30">
              Con IA integrada
            </div>

            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-[10px] font-black text-primary-dynamic uppercase tracking-widest block mb-1">VendexChat</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Plataforma IA-First</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-dynamic/10 border border-primary-dynamic/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary-dynamic" />
              </div>
            </div>

            {/* Chat mockup - IA */}
            <div className="rounded-[1.5rem] bg-white border border-slate-100 shadow-inner p-5 mb-8">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="font-bold">IA Vendex</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-dynamic animate-pulse" />
                  En línea 24/7
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-slate-600">
                  ¿Cuál es el combo con papas grandes?
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary-dynamic/10 border border-primary-dynamic/20 px-3 py-2 ml-auto text-slate-700">
                  <span className="block font-bold text-[10px] text-primary-dynamic mb-1">IA VENDEX:</span>
                  El Combo 2 trae papas grandes y bebida a $12.500. ¿Te lo agrego al carrito?
                </div>
                <div className="max-w-[60%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-slate-600">
                  Sí dale!
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary-dynamic/10 border border-primary-dynamic/20 px-3 py-2 ml-auto text-slate-700 text-xs">
                  ✓ Pedido armado. Total: $12.500. ¿Confirmamos?
                </div>
              </div>
            </div>

            <ul className="space-y-4">
              {vendexItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-dynamic/10 border border-primary-dynamic/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-dynamic" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
