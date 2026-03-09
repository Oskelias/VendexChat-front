import { useState } from "react";
import {
  ClipboardList, FileUp, Users, Truck, BarChart2,
  LayoutDashboard, Bell, Settings, Search, ChevronRight,
  Package, CheckCircle2, AlertCircle,
  ArrowUpRight, ArrowDownRight, Star,
  Store, HelpCircle, SlidersHorizontal, Clock, CreditCard,
  QrCode, Ticket, Layers, Tag, Plus, ShoppingBag
} from "lucide-react";

type SectionId = "dashboard" | "pedidos" | "catalogo" | "crm" | "logistica" | "estadisticas";

const NAV_ITEMS: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: "pedidos",      label: "Pedidos",      icon: ClipboardList },
  { id: "catalogo",     label: "Catálogo IA",  icon: FileUp        },
  { id: "crm",          label: "CRM",          icon: Users         },
  { id: "logistica",    label: "Logística",    icon: Truck         },
  { id: "estadisticas", label: "Estadísticas", icon: BarChart2     },
];

/* ── DASHBOARD HOME ──────────────────────────────────────────────────── */
const QUICK_ACCESS = [
  { label: "Mi Tienda",        icon: Store              },
  { label: "Ayuda",            icon: HelpCircle         },
  { label: "Sliders",          icon: SlidersHorizontal  },
  { label: "Horarios",         icon: Clock              },
  { label: "Métodos de cobro", icon: CreditCard         },
  { label: "Envío / Retiro",   icon: Truck              },
  { label: "Menú QR",          icon: QrCode             },
  { label: "Cupones",          icon: Ticket             },
  { label: "Popups",           icon: Layers             },
  { label: "Editor Precios",   icon: Tag                },
];

const DashboardPanel = () => (
  <div className="flex flex-col gap-4 p-5 h-full overflow-auto bg-slate-50">
    {/* Page header */}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-black text-slate-900">Dashboard</h3>
        <p className="text-[11px] text-slate-400 font-medium">Bienvenido de nuevo a tu panel de control.</p>
      </div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors shadow-sm">
        <Plus className="w-3 h-3" /> Nuevo Producto
      </button>
    </div>

    {/* KPI cards */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Pedidos de hoy",    value: "67",       icon: ShoppingBag, color: "bg-emerald-50 text-emerald-600" },
        { label: "Ventas hoy",        value: "$847.200", icon: ArrowUpRight, color: "bg-blue-50 text-blue-600"    },
        { label: "Productos activos", value: "81",       icon: Package,     color: "bg-violet-50 text-violet-600"  },
      ].map(k => (
        <div key={k.label} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${k.color}`}>
            <k.icon className="w-3.5 h-3.5" />
          </div>
          <p className="text-base font-black text-slate-900 leading-none mb-0.5">{k.value}</p>
          <p className="text-[10px] text-slate-400 font-semibold">{k.label}</p>
        </div>
      ))}
    </div>

    {/* Quick access */}
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Acceso rápido</p>
      <div className="grid grid-cols-5 gap-2">
        {QUICK_ACCESS.map(qa => (
          <div
            key={qa.label}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <qa.icon className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">{qa.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── PEDIDOS ─────────────────────────────────────────────────────────── */
const ORDERS = [
  { id: "#301", name: "María González",  items: "Combo Familiar × 2",          total: "$34.800", time: "hace 3 min",  status: "nuevo"       },
  { id: "#300", name: "Carlos Ruiz",     items: "Remera básica + Jean skinny",  total: "$32.500", time: "hace 12 min", status: "preparando"  },
  { id: "#299", name: "Lucía Fernández", items: "Buzo hoodie × 1",              total: "$18.500", time: "hace 28 min", status: "enviado"      },
  { id: "#298", name: "Pedro Gómez",     items: "Calza deportiva × 3",          total: "$22.200", time: "hace 1 h",   status: "entregado"    },
];

const STATUS_STYLES: Record<string, string> = {
  nuevo:       "bg-violet-100 text-violet-700",
  preparando:  "bg-amber-100  text-amber-700",
  enviado:     "bg-blue-100   text-blue-700",
  entregado:   "bg-emerald-100 text-emerald-700",
};

const PedidosPanel = () => (
  <div className="flex flex-col gap-3 p-4 h-full overflow-auto">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Pedidos recientes</span>
      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">4 nuevos hoy</span>
    </div>
    {ORDERS.map(o => (
      <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 flex-shrink-0">
          {o.id}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-900 truncate">{o.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{o.items}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-xs font-black text-slate-900">{o.total}</span>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[o.status]}`}>{o.status}</span>
        </div>
        <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-500 flex-shrink-0" />
      </div>
    ))}
  </div>
);

/* ── CATÁLOGO ────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { name: "Remera básica negra", cat: "Ropa",      price: "$8.500",  stock: 43, img: "🖤" },
  { name: "Jean skinny azul",    cat: "Ropa",      price: "$24.000", stock: 12, img: "👖" },
  { name: "Buzo hoodie gris",    cat: "Abrigos",   price: "$18.500", stock: 28, img: "🔘" },
  { name: "Combo Familiar",      cat: "Combos",    price: "$35.000", stock: 99, img: "📦" },
  { name: "Calza deportiva",     cat: "Deportivo", price: "$7.200",  stock:  6, img: "🩱" },
  { name: "Campera impermeable", cat: "Abrigos",   price: "$52.000", stock: 15, img: "🧥" },
];

const CatalogoPanel = () => (
  <div className="flex flex-col gap-3 p-4 h-full overflow-auto">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Catálogo</span>
      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">↑ Importar con IA</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {PRODUCTS.map(p => (
        <div key={p.name} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer">
          <div className="text-2xl mb-2">{p.img}</div>
          <p className="text-[11px] font-black text-slate-900 leading-tight">{p.name}</p>
          <p className="text-[10px] text-slate-400 mb-1">{p.cat}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-blue-600">{p.price}</span>
            <span className={`text-[9px] font-bold ${p.stock < 10 ? "text-red-500" : "text-emerald-600"}`}>
              {p.stock} uds
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── CRM ─────────────────────────────────────────────────────────────── */
const CUSTOMERS = [
  { name: "María González",  orders: 8,  total: "$142k", tag: "VIP",      avatar: "MG" },
  { name: "Carlos Ruiz",     orders: 5,  total: "$98k",  tag: "frecuente", avatar: "CR" },
  { name: "Lucía Fernández", orders: 6,  total: "$87k",  tag: "frecuente", avatar: "LF" },
  { name: "Ana Müller",      orders: 2,  total: "$31k",  tag: "nuevo",     avatar: "AM" },
  { name: "Tomás López",     orders: 1,  total: "$8k",   tag: "inactivo",  avatar: "TL" },
];

const TAG_STYLES: Record<string, string> = {
  VIP:       "bg-violet-100 text-violet-700",
  frecuente: "bg-emerald-100 text-emerald-700",
  nuevo:     "bg-blue-100 text-blue-700",
  inactivo:  "bg-slate-100 text-slate-500",
};

const CRMPanel = () => (
  <div className="flex flex-col gap-3 p-4 h-full overflow-auto">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Clientes</span>
      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">144 totales</span>
    </div>
    {CUSTOMERS.map(c => (
      <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-700 flex-shrink-0">
          {c.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-900 truncate">{c.name}</p>
          <p className="text-[11px] text-slate-400">{c.orders} pedidos · {c.total}</p>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${TAG_STYLES[c.tag]}`}>{c.tag}</span>
      </div>
    ))}
  </div>
);

/* ── LOGÍSTICA ───────────────────────────────────────────────────────── */
const SHIPMENTS = [
  { id: "#301", name: "María González",  dest: "Zona Norte",  status: "en camino",  eta: "hoy 15–18hs",  icon: Truck          },
  { id: "#300", name: "Carlos Ruiz",     dest: "Zona Sur",    status: "preparando", eta: "mañana",       icon: Package        },
  { id: "#299", name: "Lucía Fernández", dest: "Zona Centro", status: "entregado",  eta: "entregado",    icon: CheckCircle2   },
  { id: "#298", name: "Pedro Gómez",     dest: "Zona Este",   status: "demorado",   eta: "sin confirmar",icon: AlertCircle    },
];

const SHIP_STYLES: Record<string, { bg: string; text: string }> = {
  "en camino":  { bg: "bg-blue-100",    text: "text-blue-700"    },
  preparando:   { bg: "bg-amber-100",   text: "text-amber-700"   },
  entregado:    { bg: "bg-emerald-100", text: "text-emerald-700" },
  demorado:     { bg: "bg-red-100",     text: "text-red-700"     },
};

const LogisticaPanel = () => (
  <div className="flex flex-col gap-3 p-4 h-full overflow-auto">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Envíos activos</span>
      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">1 demorado</span>
    </div>
    {SHIPMENTS.map(s => (
      <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors cursor-pointer">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${SHIP_STYLES[s.status].bg}`}>
          <s.icon className={`w-4 h-4 ${SHIP_STYLES[s.status].text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-900 truncate">{s.name}</p>
          <p className="text-[11px] text-slate-400">{s.dest} · {s.eta}</p>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${SHIP_STYLES[s.status].bg} ${SHIP_STYLES[s.status].text}`}>
          {s.status}
        </span>
      </div>
    ))}
  </div>
);

/* ── ESTADÍSTICAS ────────────────────────────────────────────────────── */
const EstadisticasPanel = () => (
  <div className="flex flex-col gap-4 p-4 h-full overflow-auto">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Este mes</span>
      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">Marzo 2026</span>
    </div>
    {/* KPI cards */}
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Ventas totales",   value: "$847.200",   delta: "+18%", up: true,  color: "text-slate-900" },
        { label: "Pedidos",          value: "67",         delta: "+24%", up: true,  color: "text-slate-900" },
        { label: "Ticket promedio",  value: "$12.644",    delta: "-5%",  up: false, color: "text-slate-900" },
        { label: "Clientes nuevos",  value: "23",         delta: "+28%", up: true,  color: "text-slate-900" },
      ].map(k => (
        <div key={k.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold mb-1">{k.label}</p>
          <p className={`text-base font-black ${k.color}`}>{k.value}</p>
          <div className={`flex items-center gap-0.5 text-[10px] font-bold mt-0.5 ${k.up ? "text-emerald-600" : "text-red-500"}`}>
            {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {k.delta} vs mes anterior
          </div>
        </div>
      ))}
    </div>
    {/* Top products */}
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Top productos</p>
      {[
        { name: "Remera básica negra", uds: 43, pct: 85 },
        { name: "Jean skinny",         uds: 31, pct: 60 },
        { name: "Buzo hoodie",         uds: 28, pct: 55 },
      ].map(p => (
        <div key={p.name} className="flex items-center gap-2 mb-2">
          <Star className="w-3 h-3 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 flex-1 truncate">{p.name}</span>
          <span className="text-[10px] text-slate-400">{p.uds} uds</span>
          <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-pink-400 rounded-full" style={{ width: `${p.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PANELS: Record<SectionId, React.ReactNode> = {
  dashboard:    <DashboardPanel />,
  pedidos:      <PedidosPanel />,
  catalogo:     <CatalogoPanel />,
  crm:          <CRMPanel />,
  logistica:    <LogisticaPanel />,
  estadisticas: <EstadisticasPanel />,
};

const HowItWorksSection = () => {
  const [active, setActive] = useState<SectionId>("dashboard");

  return (
    <section id="gestion" className="relative py-14 md:py-20 min-h-screen bg-slate-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] -z-10 translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-3 md:whitespace-nowrap">
            Todo tu negocio en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              un solo lugar
            </span>
          </h2>
          <p className="text-base md:text-xl text-slate-500 font-medium mx-auto md:whitespace-nowrap">
            Pedidos, catálogo, clientes y envíos — todo centralizado en un panel simple, diseñado para que no pierdas tiempo.
          </p>
        </div>

        {/* Interactive dashboard mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-x-auto shadow-2xl shadow-slate-300/40 border border-slate-200 bg-white">
          <div className="min-w-[320px] sm:min-w-[700px]">

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 bg-slate-100 border-b border-slate-200">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-4 py-1 text-[11px] font-medium text-slate-400 border border-slate-200 max-w-xs mx-auto text-center">
                  admin.vendexchat.app
                </div>
              </div>
            </div>

            {/* App layout */}
            <div className="flex" style={{ minHeight: "480px" }}>

              {/* Sidebar */}
              <div className="hidden sm:flex w-44 flex-shrink-0 bg-slate-900 flex-col py-4">
                {/* Logo in sidebar */}
                <div className="px-4 mb-6">
                  <span className="text-xs font-black text-white">VENDEx<span className="text-violet-400">.IA</span></span>
                </div>
                {/* Nav */}
                <div className="flex flex-col gap-1 px-2">
                  <button
                    onClick={() => setActive("dashboard")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all text-[11px] font-semibold w-full ${
                      active === "dashboard" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 flex-shrink-0" />
                    Dashboard
                  </button>
                  {NAV_ITEMS.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all text-[11px] font-semibold w-full ${
                        active === item.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
                {/* Bottom */}
                <div className="mt-auto px-2 flex flex-col gap-1">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all text-[11px] font-semibold w-full">
                    <Settings className="w-3.5 h-3.5" /> Ajustes
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Top bar */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-1 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-200 max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] text-slate-400">Buscar...</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                      <Bell className="w-4 h-4 text-slate-400" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black">
                      AD
                    </div>
                  </div>
                </div>

                {/* Panel content */}
                <div className="flex-1 overflow-hidden">
                  <div key={active} className="h-full animate-in fade-in duration-200">
                    {PANELS[active]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Tab hint pills below */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  active === item.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
