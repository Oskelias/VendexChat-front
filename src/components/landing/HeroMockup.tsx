import { Bot, CheckCircle2, LayoutDashboard, PackageSearch, ShoppingBag, Sparkles, TrendingUp, Zap } from "lucide-react";

const products = [
  { emoji: "🍔", name: "Burger clásica", price: "$2.700", hot: true },
  { emoji: "🍕", name: "Pizza napolitana", price: "$3.200", hot: false },
  { emoji: "🥗", name: "Bowl verde", price: "$1.900", hot: false },
  { emoji: "☕", name: "Café doble", price: "$950", hot: true },
  { emoji: "🍰", name: "Torta brownie", price: "$1.400", hot: false },
  { emoji: "🥤", name: "Smoothie frutilla", price: "$1.100", hot: false },
];

const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-[580px] h-[460px] sm:h-[500px]">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-emerald-300/50 via-cyan-200/40 to-violet-400/50 blur-3xl" />
      </div>

      {/* ── Dashboard / Admin Panel ── */}
      <div className="absolute left-0 top-6 w-[310px] sm:w-[340px] rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <LayoutDashboard className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400 text-[11px] font-semibold">VENDEx · Panel Admin</span>
          </div>
          <span className="ml-auto flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            IA activa
          </span>
        </div>

        <div className="p-4">
          {/* Catalog header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <PackageSearch className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-black text-slate-800">Mi Catálogo</span>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full border border-indigo-100">
              6 productos activos
            </span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {products.map((p) => (
              <div key={p.name} className="relative rounded-xl border border-slate-100 bg-slate-50 p-2 flex flex-col items-center gap-1">
                {p.hot && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none">HOT</span>
                )}
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">{p.name}</span>
                <span className="text-[10px] font-black text-emerald-600">{p.price}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-indigo-50 p-2 text-center border border-indigo-100">
              <p className="text-base font-black text-indigo-700">124</p>
              <p className="text-[10px] text-indigo-500 font-medium">Productos</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-2 text-center border border-emerald-100">
              <p className="text-base font-black text-emerald-700">47</p>
              <p className="text-[10px] text-emerald-500 font-medium">Pedidos hoy</p>
            </div>
            <div className="rounded-xl bg-violet-50 p-2 text-center border border-violet-100">
              <p className="text-base font-black text-violet-700">$8.4K</p>
              <p className="text-[10px] text-violet-500 font-medium">Ventas</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phone: AI Assistant ── */}
      <div className="absolute right-0 top-0 w-[155px] sm:w-[175px] rotate-[4deg] rounded-[2rem] border-[4px] border-violet-900 bg-[#1f1145] p-2 shadow-[0_24px_50px_rgba(76,29,149,0.4)]">
        <div className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 rounded-b-2xl bg-[#1f1145]" />
        <div className="overflow-hidden rounded-[1.6rem] bg-slate-50">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-100 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-semibold leading-none">Asistente IA · en línea</p>
                <p className="text-[10px] font-black text-slate-800 leading-tight">Tu Tienda</p>
              </div>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Chat messages */}
          <div className="space-y-2 bg-slate-50 p-2.5">
            <div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm">
              ¡Hola! Soy tu asistente IA ✨<br />¿Qué buscás hoy?
            </div>

            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-indigo-600 px-2.5 py-1.5 text-[10px] font-medium text-white">
              Quiero una burger y una bebida
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-800 mb-1.5">
                <span>🍔 Burger + 🥤</span>
                <span className="text-emerald-600">$3.800</span>
              </div>
              <button className="w-full rounded-lg bg-emerald-500 py-1.5 text-[9px] font-black text-white">
                Agregar al pedido
              </button>
            </div>

            <div className="rounded-xl bg-white px-2.5 py-2 shadow-sm">
              <p className="flex items-center gap-1.5 text-[10px] font-black text-slate-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Pedido listo
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5">Total: $3.800</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-white px-2 py-2">
            <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 text-[9px] font-black text-white">
              <Sparkles className="w-3 h-3" /> Respuesta IA inmediata
            </button>
          </div>
        </div>
      </div>

      {/* ── Floating badges ── */}
      {/* Top left: automation */}
      <div className="absolute left-2 -top-2 rounded-2xl bg-white/95 px-3 py-2 shadow-xl border border-slate-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
        </div>
        <span className="text-xs font-black text-slate-800">Panel automatizado</span>
      </div>

      {/* Right middle: 24/7 sales */}
      <div className="absolute right-2 top-[52%] rounded-2xl bg-white/95 px-3 py-2 shadow-xl border border-slate-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-xl bg-amber-100 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <span className="text-xs font-black text-amber-600">Ventas 24/7</span>
      </div>

      {/* Bottom left: new orders */}
      <div className="absolute left-0 bottom-4 rounded-2xl bg-white/95 px-3 py-2 shadow-xl border border-slate-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-xl bg-emerald-100 flex items-center justify-center">
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-black text-slate-800 leading-none">+12 pedidos nuevos</p>
          <p className="text-[10px] text-slate-400 font-medium">hoy · sin intervención</p>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
