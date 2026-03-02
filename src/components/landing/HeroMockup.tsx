import { ShoppingCart, Bot, MessageCircle, Star, Wifi, Battery } from "lucide-react";

const products = [
  { name: "Hamburguesa Clásica", price: "$1.500", emoji: "🍔", rating: "4.8", desc: "Pan brioche, doble cheddar" },
  { name: "Pizza Muzarella", price: "$2.200", emoji: "🍕", rating: "4.9", desc: "Grande, borde relleno" },
  { name: "Empanadas x6", price: "$1.800", emoji: "🥟", rating: "4.7", desc: "Carne, pollo o verdura" },
];

const HeroMockup = () => {
  return (
    <div className="relative w-48 sm:w-56">
      {/* Side buttons */}
      <div className="absolute left-[-5px] top-[88px] w-[5px] h-8 bg-slate-700 rounded-l-sm" />
      <div className="absolute left-[-5px] top-[138px] w-[5px] h-6 bg-slate-700 rounded-l-sm" />
      <div className="absolute right-[-5px] top-[112px] w-[5px] h-10 bg-slate-700 rounded-r-sm" />

      {/* Phone frame */}
      <div className="bg-slate-900 rounded-[3rem] p-[10px] shadow-2xl border-[3px] border-slate-700 ring-1 ring-slate-600/30">
        {/* Notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-2xl z-10 flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-slate-700 rounded-full" />
          <div className="w-1 h-1 bg-slate-600 rounded-full" />
        </div>

        {/* Screen */}
        <div className="bg-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col" style={{ height: "440px" }}>

          {/* Status bar */}
          <div className="bg-white px-5 pt-5 pb-1 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-700">9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-slate-500" />
              <Battery className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>

          {/* Store header */}
          <div className="bg-emerald-500 px-4 py-2 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-lg">
                🍔
              </div>
              <div>
                <p className="text-[9px] text-emerald-100 font-medium">Tienda VendexChat</p>
                <p className="text-white font-black text-sm leading-tight">Morfi</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-white" />
                <span className="absolute mt-[-10px] ml-3 w-3.5 h-3.5 bg-red-500 rounded-full text-[7px] text-white font-black flex items-center justify-center">2</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white px-3 py-2 border-b border-slate-100">
            <div className="bg-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="text-slate-400 text-[10px]">🔍</span>
              <span className="text-[10px] text-slate-400">Buscar producto...</span>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 overflow-hidden px-3 py-1.5 space-y-1.5 bg-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Más pedidos hoy</p>

            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-sm border border-slate-100"
              >
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black text-slate-800 leading-tight truncate">{product.name}</p>
                  <p className="text-[9px] text-slate-400 truncate">{product.desc}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs font-black text-emerald-500">{product.price}</p>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-[9px] text-slate-400 font-medium">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-300">
                  <span className="text-white text-xs font-black leading-none">+</span>
                </button>
              </div>
            ))}

            {/* AI Chat bubble */}
            <div className="flex items-start gap-2 pt-1">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-slate-100 max-w-[80%]">
                <p className="text-[10px] text-slate-700 font-medium leading-snug">
                  ¡Hola! Soy tu asistente IA ✨<br />
                  <span className="text-slate-500">¿Te ayudo a elegir algo?</span>
                </p>
                <p className="text-[8px] text-slate-300 mt-1 font-medium">IA • ahora</p>
              </div>
            </div>
          </div>

          {/* WhatsApp send button */}
          <div className="bg-white border-t border-slate-100 px-3 py-2.5">
            <button className="w-full bg-[#25D366] text-white rounded-2xl py-2.5 flex items-center justify-center gap-2 font-black text-[11px] shadow-lg shadow-green-500/25">
              <MessageCircle className="w-3.5 h-3.5" />
              Enviar pedido por WhatsApp
            </button>
          </div>

        </div>
      </div>

      {/* Floating badge: new order */}
      <div className="absolute -right-6 top-14 bg-white rounded-2xl px-3 py-2 shadow-xl border border-slate-100 animate-float">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎉</span>
          <div>
            <p className="text-[10px] font-black text-slate-700">Nuevo pedido</p>
            <p className="text-[9px] text-slate-400">hace 2 min</p>
          </div>
        </div>
      </div>

      {/* Floating badge: daily orders */}
      <div
        className="absolute -left-6 bottom-16 bg-emerald-500 rounded-2xl px-3 py-2 shadow-xl animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <p className="text-[10px] font-black text-white">✅ 47 pedidos hoy</p>
      </div>

      {/* Floating badge: AI active */}
      <div
        className="absolute -right-4 bottom-8 bg-violet-600 rounded-2xl px-3 py-2 shadow-xl animate-float"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-1">
          <Bot className="w-3 h-3 text-white" />
          <p className="text-[10px] font-black text-white">IA activa</p>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
