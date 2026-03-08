import { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  MessageCircle,
  Users,
  Truck,
  Brain,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Settings,
  Sparkles
} from "lucide-react";
import { StoreHeader } from "@/shop/components/StoreHeader";
import { CategoryChips } from "@/shop/components/CategoryChips";
import { ProductCard } from "@/shop/components/ProductCard";
import { ChatBotWidget } from "@/shop/components/ChatBotWidget";
import type { Product, Category } from "@/types";

/* ── MOCK DATA ── */

const INITIAL_DEMO_CATEGORIES: Category[] = [
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
      {
        id: "p3",
        name: "Wok de Vegetales y Arroz",
        description: "Mezcla de vegetales salteados con toques de sésamo y jengibre",
        price: 3500,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
        stock: 15,
        unlimited_stock: false,
        is_active: true,
        category_id: "cat-1",
        sort_order: 3,
      }
    ],
  },
  {
    id: "cat-2",
    name: "Combos Semanales",
    products: [
      {
        id: "p4",
        name: "Plan 5 viandas – Clásico",
        description: "5 viandas variadas de lunes a viernes (Casero)",
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
        id: "p5",
        name: "Plan 5 viandas – Fit",
        description: "5 viandas saludables, bajas en calorías y grasas",
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
    name: "Postre y Tentación",
    products: [
      {
        id: "p6",
        name: "Flan casero",
        description: "Clásico flan de huevo con generoso dulce de leche y crema",
        price: 2200,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-3",
        sort_order: 1,
      },
      {
        id: "p7",
        name: "Chocotorta",
        description: "Capas de galletitas de chocolate y crema de dulce de leche",
        price: 2800,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
        stock: 10,
        unlimited_stock: false,
        is_active: true,
        category_id: "cat-3",
        sort_order: 2,
      }
    ],
  },
  {
    id: "cat-4",
    name: "Bebidas",
    products: [
      {
        id: "p8",
        name: "Jugo natural",
        description: "Exprimido de naranja natural 350ml",
        price: 1500,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-4",
        sort_order: 1,
      },
      {
        id: "p9",
        name: "Agua Mineral",
        description: "Botella 500ml",
        price: 900,
        offer_price: null,
        image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
        stock: 99,
        unlimited_stock: true,
        is_active: true,
        category_id: "cat-4",
        sort_order: 2,
      }
    ],
  },
];

/* ── COMPONENTS ── */

const TooltipCloud = ({ text, position = "top", visible, onClose }: { text: string; position?: "top" | "bottom" | "left" | "right"; visible: boolean; onClose: () => void }) => {
  if (!visible) return null;

  const posClasses = {
    top: "-top-12 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-4 left-1/2 -translate-x-1/2",
    left: "right-full mr-4 top-1/2 -translate-y-1/2",
    right: "left-full ml-4 top-1/2 -translate-y-1/2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-900",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-900"
  };

  return (
    <div className={`absolute z-[100] animate-in fade-in zoom-in duration-300 ${posClasses[position]}`}>
      <div className="bg-slate-900/95 backdrop-blur text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap flex items-center gap-2 border border-slate-700/50">
        <Sparkles className="w-3 h-3 text-emerald-400" />
        {text}
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="ml-2 hover:text-emerald-400 transition-colors">
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] ${arrowClasses[position]}`} />
    </div>
  );
};

export default function DemoPage() {
  const [categories, setCategories] = useState(INITIAL_DEMO_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string | number | null>("cat-1");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderLegend, setShowOrderLegend] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0); // 0: Start, 1: Cart, 2: IA, 3: Dashboard, 4: Done
  const [adminPriceInput, setAdminPriceInput] = useState<number>(4500);

  const [isChatOpen, setIsChatOpen] = useState(false);

  // Flatten products for IA
  const allProducts = useMemo(() => categories.flatMap(c => c.products), [categories]);

  // Sync admin price to first product
  useEffect(() => {
    const currentPrice = categories[0].products[0].price;
    if (currentPrice !== adminPriceInput) {
      setCategories(prev => {
        const next = [...prev];
        const prod = next[0].products[0];
        next[0].products[0] = { ...prod, price: adminPriceInput };
        return next;
      });
    }
  }, [adminPriceInput, categories]);

  const getItemQuantity = (id: string) => cart[id] || 0;

  const addItem = (p: Product) => {
    setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));
    if (tutorialStep === 1) setTutorialStep(2);
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
  const totalPrice = useMemo(() => {
    let sum = 0;
    categories.forEach(c => {
      c.products.forEach(p => {
        if (cart[p.id]) sum += (p.offer_price || p.price) * cart[p.id];
      });
    });
    return sum;
  }, [cart, categories]);

  const filteredCategories = useMemo(() => {
    const all = categories.map((cat) => ({
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
  }, [searchTerm, activeCategory, categories]);

  const closeTutorial = () => setTutorialStep(100);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 overflow-x-hidden" style={{ "--primary-color": "#14b8a6" } as React.CSSProperties}>

      {/* Welcome Modal */}
      {tutorialStep === 0 && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Sparkles className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">¡Bienvenido al Showroom!</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Hemos preparado esta demo para que experimentes <b>VENDEx</b> en ambos lados: como cliente y como administrador.
            </p>
            <button
              onClick={() => setTutorialStep(1)}
              className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
            >
              Empezar Tour Interactivo
            </button>
            <button onClick={closeTutorial} className="mt-6 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
              Saltar intro
            </button>
          </div>
        </div>
      )}

      {/* Legend Modal for WhatsApp Simulation */}
      {showOrderLegend && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowOrderLegend(false)} />
          <div className="relative bg-slate-900 rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl border border-slate-800">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black text-white mb-3">Simulación de WhatsApp</h3>
            <p className="text-slate-400 font-medium mb-8">
              En una tienda real de VENDEx, al presionar este botón se abriría <b>WhatsApp</b> con el mensaje del pedido ya armado para el vendedor.
            </p>
            <div className="bg-white/5 rounded-2xl p-4 text-left border border-white/5 mb-8">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Mensaje generado</p>
              <p className="text-xs text-slate-300 italic font-mono leading-relaxed">
                "*NUEVO PEDIDO #204*\n- 2x Milanesa napolitana\n- 1x Chocotorta\nTOTAL: $11.800"
              </p>
            </div>
            <button
              onClick={() => setShowOrderLegend(false)}
              className="w-full bg-emerald-500 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl space-y-24">

        {/* Header de la página */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Showroom Real-Time
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            Experiencia <span className="text-emerald-500">VENDEx</span> Demo
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Interactúa con la tienda a la izquierda y observa cómo la inteligencia artificial gestiona tus pedidos a la derecha.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">

          {/* ── COLUMNA 1: TIENDA (8/12) ── */}
          <div className="xl:col-span-12 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Vista del Cliente</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tu tienda funcionando 24/7</p>
                </div>
              </div>
              {tutorialStep === 1 && (
                <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] animate-pulse">
                  Paso 1: Agrega un producto
                </div>
              )}
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden bg-white ring-1 ring-slate-100 relative">
              {/* Tutorial Cloud for Products */}
              <TooltipCloud
                text="Agrega productos aquí"
                visible={tutorialStep === 1}
                position="bottom"
                onClose={() => setTutorialStep(2)}
              />

              {/* Browser bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-8 py-5 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-sm" />
                </div>
                <div className="flex-1 bg-white rounded-2xl px-5 py-2.5 text-sm text-slate-400 font-bold border border-slate-200 flex items-center gap-3 shadow-inner">
                  <span className="text-slate-300">🔒</span>
                  tusabor.vendexchat.app
                </div>
              </div>

              {/* Contenido de la tienda */}
              <div className="bg-white relative">
                <StoreHeader
                  name="Sabor Casero (Demo)"
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
                  onCartClick={() => setIsCartOpen(true)}
                />

                <CategoryChips
                  categories={categories}
                  activeId={activeCategory}
                  onSelect={setActiveCategory}
                />

                <main className="max-w-4xl mx-auto px-6 py-10">
                  {filteredCategories.length === 0 ? (
                    <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100">
                      <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
                        No se encontraron productos
                      </p>
                    </div>
                  ) : (
                    filteredCategories.map((cat) => (
                      <section key={cat.id} className="mb-16">
                        <div className="flex items-center gap-6 mb-8">
                          <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-tighter">
                            {cat.name}
                          </h2>
                          <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-100 to-transparent" />
                          <span className="text-[10px] font-black bg-slate-900 text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                            {cat.products.length} Items
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                          {cat.products.map((p) => (
                            <div key={p.id} className="group relative">
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

                {/* Asistente IA INTEGRADO */}
                <div className="fixed bottom-12 right-12 z-[150] scale-90 origin-bottom-right">
                  <TooltipCloud
                    text="Aclara dudas con IA"
                    visible={tutorialStep === 3}
                    position="left"
                    onClose={() => setTutorialStep(4)}
                  />
                  <ChatBotWidget
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    storeName="Sabor Casero"
                    products={allProducts}
                    initialMessage="¡Hola! Soy el asistente IA de Sabor Casero. ¿Te ayudo con el menú de hoy?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── SECCIÓN 2: DASHBOARD ADMIN (COLUMNA COMPLETA DEBAJO O LADO) ── */}
          <div className="xl:col-span-12 mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-600 rounded-2xl shadow-lg shadow-violet-200">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Tu Dashboard Administrativo</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gestiona con IA en tiempo real</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden bg-white ring-1 ring-slate-100">
              {/* Browser bar admin */}
              <div className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-sm" />
                </div>
                <div className="flex-1 bg-slate-800 rounded-2xl px-5 py-2.5 text-sm text-slate-400 font-bold border border-slate-700 flex items-center gap-3 shadow-inner">
                  <span className="text-slate-600">🔒</span>
                  admin.vendexchat.app/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-slate-50 p-8 md:p-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    { label: "Ventas hoy", value: `$${(totalPrice + 45000).toLocaleString()}`, icon: TrendingUp, change: "+18%", color: "text-emerald-500" },
                    { label: "Pedidos", value: "48", icon: Package, change: "+12", color: "text-blue-500" },
                    { label: "Mensajes IA", value: "234", icon: MessageCircle, change: "activo", color: "text-violet-500" },
                    { label: "Analítica", value: "98%", icon: Sparkles, change: "Óptima", color: "text-pink-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{stat.label}</span>
                        <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                      </div>
                      <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                      <div className="mt-2 flex items-center gap-1">
                        <span className={`text-[11px] font-black ${stat.color}`}>{stat.change}</span>
                        <span className="text-[10px] text-slate-300 font-bold">vs ayer</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Editor de Producto (Sincronizado) */}
                  <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative">
                    <TooltipCloud
                      text="Cambia el precio y mira arriba"
                      visible={tutorialStep === 4}
                      position="top"
                      onClose={() => setTutorialStep(5)}
                    />
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Settings className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-slate-800 uppercase tracking-tight">Gestión en Vivo</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Producto Seleccionado</label>
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm">
                            <img src={categories[0].products[0].image_url} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm">{categories[0].products[0].name}</p>
                            <p className="text-xs text-slate-400 font-bold">Categoría: {categories[0].name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Precio Público ($)</label>
                        <input
                          type="number"
                          value={adminPriceInput}
                          onChange={(e) => {
                            setAdminPriceInput(Number(e.target.value));
                            if (tutorialStep === 4) setTutorialStep(5);
                          }}
                          className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl py-4 px-6 text-xl font-black text-slate-900 outline-none transition-all shadow-inner"
                        />
                        <p className="text-[10px] text-slate-400 font-bold italic mt-1 pl-1">
                          Tip: Cambia el precio y verás cómo se actualiza automáticamente en la tienda de arriba.
                        </p>
                      </div>

                      <button className="w-full bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all opacity-50 cursor-not-allowed">
                        Guardar Cambios
                      </button>
                    </div>
                  </div>

                  {/* Herramientas IA */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                        <Brain className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-slate-800 uppercase tracking-tight">Módulos de Inteligencia</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      {[
                        { title: "VENDEx Bot", desc: "IA entrenada en tu catálogo", color: "violet" },
                        { title: "CRM Predictivo", desc: "Detecta clientes frecuentes", color: "emerald" },
                        { title: "Smart Inventory", desc: "Aviso de stock bajo inteligente", color: "amber" },
                        { title: "Auto-Importador", desc: "Carga productos por voz o foto", color: "blue" },
                      ].map(tool => (
                        <div key={tool.title} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all cursor-default group">
                          <div className={`w-10 h-10 rounded-2xl bg-${tool.color}-50 text-${tool.color}-600 flex items-center justify-center flex-shrink-0`}>
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-800 text-sm tracking-tight">{tool.title}</h4>
                            <p className="text-xs text-slate-400 font-medium leading-tight mt-1">{tool.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="text-center pt-16 max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden border border-slate-100">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-48 h-48 text-emerald-500" />
          </div>
          <p className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] mb-8">Empieza Hoy Mismo</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter">
            ¿Listo para llevar tu negocio al <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">siguiente nivel?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://admin.vendexchat.app/register"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl bg-emerald-500 text-white font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 group"
            >
              CREAR MI TIENDA GRATIS <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/" className="text-slate-400 font-bold hover:text-slate-600 transition-all uppercase tracking-widest text-xs">
              Volver a la Home
            </a>
          </div>
          <p className="text-slate-400 text-xs font-bold mt-10 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Registro en 30 segundos • Sin tarjetas
          </p>
        </div>

      </div>

      <div className="mt-32 py-10 text-center bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
              VENDExChat.IA © 2026 • Real-time Demo Engine
            </p>
            <div className="flex items-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
              <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
              <span className="hover:text-white cursor-pointer transition-colors">Soporte</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUSTOM DEMO CART DRAWER ── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[190] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 rounded-l-[3rem] border-l border-slate-100 ring-1 ring-slate-100">

            {/* Header */}
            <div className="px-10 py-10 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tu Pedido</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{totalItems} productos seleccionados</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
              {/* Tooltip on Cart Header */}
              <TooltipCloud
                text="Ahora verás datos autocompletados"
                visible={tutorialStep === 2}
                position="left"
                onClose={() => setTutorialStep(3)}
              />
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
              {totalItems === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <Trash2 className="w-10 h-10" />
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {categories.map(c => c.products || []).flat().filter(p => p && cart[p.id]).map(p => (
                      <div key={p.id} className="flex gap-6 items-center p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-50">
                          {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-900 text-sm truncate uppercase tracking-tight">{p.name}</h4>
                          <p className="text-emerald-500 font-black text-xs mt-1">
                            ${((p.offer_price ?? p.price) ?? 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                          <button onClick={() => updateQuantity(p.id, (cart[p.id] || 0) - 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-slate-400 hover:text-slate-900 transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-black w-5 text-center">{cart[p.id]}</span>
                          <button onClick={() => addItem(p)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-90">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Datos Autocompletados */}
                  <div className="pt-8 space-y-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Tus Datos (Autocompletados en Demo)</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 px-5 py-4 rounded-2xl border-0 text-sm font-black text-slate-800 flex items-center gap-3">
                          <Users className="w-4 h-4 text-slate-300" /> Juan Pérez
                        </div>
                        <div className="bg-slate-50 px-5 py-4 rounded-2xl border-0 text-sm font-black text-slate-800 flex items-center gap-3">
                          <MessageCircle className="w-4 h-4 text-slate-300" /> +54 9 11 1234 5678
                        </div>
                      </div>
                      <div className="bg-slate-50 px-5 py-4 rounded-2xl border-0 text-sm font-black text-slate-800 flex items-center gap-3">
                        <Truck className="w-4 h-4 text-slate-300" /> Calle Falsa 123, CABA
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer del Carrito */}
            <div className="p-10 border-t border-slate-50 space-y-6 bg-slate-50/30">
              <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total a Pagar</span>
                  <div className="text-4xl font-black text-slate-900 tracking-tighter">${totalPrice.toLocaleString()}</div>
                </div>
                <div className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-black uppercase tracking-widest">
                  Envío Gratis
                </div>
              </div>
              <button
                disabled={totalItems === 0}
                onClick={() => {
                  setShowOrderLegend(true);
                  setIsCartOpen(false);
                  if (tutorialStep === 3) setTutorialStep(4);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-black uppercase tracking-[0.2em] py-6 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200"
              >
                PEDIR POR WHATSAPP <ChevronRight className="w-6 h-6" />
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Presiona para ver la simulación
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
