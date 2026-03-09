import { Bot, CheckCircle2, CircleDollarSign, MessageCircle, Sparkles } from "lucide-react";

const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-[560px]">
      <div className="absolute inset-0 -z-20 flex items-center justify-center">
        <div className="h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-emerald-300/60 via-cyan-200/50 to-violet-400/60 blur-2xl sm:h-[30rem] sm:w-[30rem]" />
      </div>

      <div className="absolute left-4 top-16 rounded-2xl bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <MessageCircle className="h-4 w-4 text-cyan-500" />
          Chat en vivo
        </div>
      </div>

      <div className="absolute -right-1 top-8 rounded-2xl bg-white/95 px-3 py-2 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-extrabold text-amber-500">
          <CircleDollarSign className="h-4 w-4" />
          Ventas 24/7
        </div>
      </div>

      <div className="absolute -left-2 bottom-20 rounded-2xl bg-white/95 px-4 py-2 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-600">
          <Bot className="h-4 w-4" />
          IA activa
        </div>
      </div>

      <div className="absolute right-2 bottom-10 rounded-full bg-emerald-500 px-5 py-2 text-sm font-black text-white shadow-lg shadow-emerald-400/40">
        Venta cerrada
      </div>

      <div className="relative ml-auto w-[260px] rotate-[8deg] rounded-[2.4rem] border-[5px] border-violet-900 bg-[#1f1145] p-2.5 shadow-[0_28px_60px_rgba(76,29,149,0.35)] sm:w-[310px]">
        <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1f1145]" />

        <div className="overflow-hidden rounded-[2rem] bg-slate-50">
          <div className="border-b border-slate-100 bg-white px-4 py-3">
            <p className="text-[10px] font-semibold text-slate-500">ASISTENTE IA · EN LÍNEA</p>
            <p className="text-sm font-black text-slate-900">Tienda VendexChat</p>
          </div>

          <div className="space-y-2.5 bg-slate-50 p-3">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] font-medium text-slate-700 shadow-sm">
              ¡Hola! Soy tu asistente IA ✨<br />¿En qué te ayudo hoy?
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
              <div className="mb-2 flex h-20 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 text-4xl">
                🍔
              </div>
              <div className="flex items-center justify-between text-sm font-black text-slate-800">
                <span>Producto destacado</span>
                <span className="text-emerald-600">$2.700</span>
              </div>
              <button className="mt-2 w-full rounded-xl bg-emerald-500 py-2 text-xs font-black text-white">
                Agregar al pedido
              </button>
            </div>

            <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-black text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Pedido generado
              </p>
              <p className="mt-1 text-xs text-slate-600">1x producto + bebida</p>
              <p className="mt-1 text-sm font-black text-slate-900">Total: $2.700</p>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white px-3 py-2.5">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-2.5 text-xs font-black text-white shadow-lg shadow-green-500/25">
              <Sparkles className="h-4 w-4" /> Respuesta IA inmediata
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
