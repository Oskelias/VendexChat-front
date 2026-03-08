import { useState, useMemo } from "react";
import {
  ExternalLink,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  Package,
  MessageCircle,
  Users,
  Bot,
  FileUp,
  Truck,
  Brain
} from "lucide-react";
import { StoreHeader } from "@/shop/components/StoreHeader";
import { CategoryChips } from "@/shop/components/CategoryChips";
import { ProductCard } from "@/shop/components/ProductCard";
import type { Product, Category } from "@/types";

/* ── Hardcoded demo data ── */

const DEMO_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Viandas del Día",
    products: [
      {
        id: "p1",
        name: "Milanesa napolitana con papas",
        description: "Milanesa de ternera con salsa, muzzarella y papas doradas",
        price: 4500,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-1",
        sort_order: 1,
      },
      {
        id: "p2",
        name: "Pollo grillado con ensalada",
        description: "Pechuga grillada con mix de hojas verdes",
        price: 4200,
        offer_price: 3800,
        image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-1",
        sort_order: 2,
      },
    ],
  },
  {
    id: "cat-2",
    name: "Combos Semanales",
    products: [
      {
        id: "p3",
        name: "Plan 5 viandas – Clásico",
        description: "5 viandas variadas de lunes a viernes",
        price: 18500,
        offer_price: 15900,
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-2",
        sort_order: 1,
      },
      {
        id: "p4",
        name: "Plan 5 viandas – Fit",
        description: "5 viandas saludables, bajas en calorías",
        price: 19500,
        offer_price: 16900,
        image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-2",
        sort_order: 2,
      },
    ],
  },
  {
    id: "cat-3",
    name: "Postres",
    products: [
      {
        id: "p5",
        name: "Flan casero con dulce de leche",
        description: "Flan de huevo con dulce de leche y crema",
        price: 2200,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-3",
        sort_order: 1,
      },
    ],
  },
  {
    id: "cat-4",
    name: "Bebidas",
    products: [
      {
        id: "p6",
        name: "Jugo natural de naranja",
        description: "Jugo de naranja recién exprimido 350ml",
        price: 1500,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-4",
        sort_order: 1,
      },
    ],
  },
];

const dashboardModules = [
  { icon: Bot, label: "VENDEx Bot", stat: "24/7 activo", color: "bg-violet-500" },
  { icon: FileUp, label: "Importador IA", stat: "80 productos en 4s", color: "bg-blue-500" },
  { icon: Users, label: "CRM Inteligente", stat: "144 clientes", color: "bg-emerald-500" },
  { icon: Truck, label: "Logística", stat: "97% entregados", color: "bg-amber-500" },
  { icon: Brain, label: "IA Predictiva", stat: "Predicción demanda", color: "bg-pink-500" },
  { icon: BarChart2, label: "Estadísticas", stat: "$847k este mes", color: "bg-cyan-500" },
];

export default function DemoPage() {
  const [activeCategory, setActiveCategory] = useState<string | number | null>("cat-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const getItemQuantity = (id: string) => cart[id] || 0;

  const addItem = (p: Product) => {
    setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));
  };

  const updateQuantity = (id: string, q: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((s, q) => s + q, 0);

  const filteredCategories = useMemo(() => {
    const all = DEMO_CATEGORIES.map((cat) => ({
      ...cat,
      products: (cat.products || []).filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })).filter((cat) => cat.products.length > 0);

    if (activeCategory !== null) {
      return all.filter((cat) => String(cat.id) === String(activeCategory));
    }
    return all;
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20" style={{ "--primary-color": "#14b8a6" } as React.CSSProperties}>
      <div className="container mx-auto px-4 max-w-6xl space-y-16">

        {/* Header de la página */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Experiencia <span className="text-emerald-500">VENDEx</span> Demo
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Explora cómo interactúan tus clientes con la tienda y cómo gestionas todo con inteligencia artificial desde tu panel.
          </p>
        </div>

        {/* ── SECCIÓN 1: TIENDA DEL CLIENTE ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Vista del Cliente
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 shadow-2xl overflow-hidden bg-white">
            {/* Browser bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-4 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded-xl px-4 py-2 text-sm text-slate-400 font-medium border border-slate-200 flex items-center gap-2">
                <span className="text-slate-300">🔒</span>
                tusabor.vendexchat.app
              </div>
            </div>

            {/* Contenido de la tienda */}
            <div className="h-[600px] overflow-y-auto bg-white">
              <StoreHeader
                name="Sabor Casero"
                logo="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                banner="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop"
                description="Viandas caseras con delivery a todo CABA. Pedidos hasta las 10hs."
                address="Palermo, CABA"
                whatsapp=""
                instagram=""
                facebook=""
                totalItems={totalItems}
                onSearch={setSearchTerm}
                onChatClick={() => { }}
                onCartClick={() => { }}
              />

              <CategoryChips
                categories={DEMO_CATEGORIES}
                activeId={activeCategory}
                onSelect={setActiveCategory}
              />

              <main className="max-w-4xl mx-auto px-4 py-8">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                      No se encontraron productos
                    </p>
                  </div>
                ) : (
                  filteredCategories.map((cat) => (
                    <section key={cat.id} className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-sm md:text-lg font-black text-slate-900 uppercase tracking-tight">
                          {cat.name}
                        </h2>
                        <div className="h-[1px] flex-1 bg-slate-100" />
                        <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {cat.products.length} Items
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        {cat.products.map((p) => (
                          <div key={p.id} className="cursor-pointer">
                            <ProductCard
                              product={p}
                              quantity={getItemQuantity(p.id)}
                              onAdd={addItem}
                              onUpdate={updateQuantity}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </main>
            </div>
          </div>
        </div>

        {/* ── SECCIÓN 2: DASHBOARD ADMIN ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-violet-100 rounded-lg">
              <BarChart2 className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Tu Dashboard con IA
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 shadow-2xl overflow-hidden bg-white">
            {/* Browser bar admin */}
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-slate-700 rounded-xl px-4 py-2 text-sm text-slate-400 font-medium border border-slate-600 flex items-center gap-2">
                <span className="text-slate-500">🔒</span>
                admin.vendexchat.app/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-slate-50 p-6 md:p-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Ventas hoy", value: "$127.400", icon: TrendingUp, change: "+18%", color: "text-emerald-500" },
                  { label: "Pedidos", value: "47", icon: Package, change: "+12", color: "text-blue-500" },
                  { label: "Mensajes IA", value: "234", icon: MessageCircle, change: "activo", color: "text-violet-500" },
                  { label: "Clientes nuevos", value: "8", icon: Users, change: "+3", color: "text-pink-500" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                    <span className={`text-[11px] font-bold ${stat.color}`}>{stat.change}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Herramientas IA disponibles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dashboardModules.map((m) => (
                    <div key={m.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-default">
                      <div className={`w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-slate-200`}>
                        <m.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 tracking-tight">{m.label}</p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">{m.stat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="text-center pt-8">
          <a
            href="https://admin.vendexchat.app/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-3xl bg-emerald-500 text-white font-black text-lg hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95"
          >
            CREAR MI TIENDA AHORA <ExternalLink className="w-6 h-6" />
          </a>
          <p className="text-slate-400 text-sm font-medium mt-6 italic">
            Empieza hoy gratis • Sin tarjeta de crédito
          </p>
        </div>

      </div>

      <div className="mt-20 py-8 text-center border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          VENDExChat.IA © 2026 • Potenciado por Inteligencia Artificial
        </p>
      </div>
    </div>
  );
}
