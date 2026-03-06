import { useState, useMemo } from "react";
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
    <div className="min-h-screen bg-white pb-24" style={{ "--primary-color": "#14b8a6" } as React.CSSProperties}>
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
        onChatClick={() => {}}
        onCartClick={() => {}}
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

      <div className="bg-slate-50 border-t border-slate-100 py-6 text-center">
        <p className="text-xs text-slate-400 font-medium">
          Esta es una tienda de demostración creada con{" "}
          <a href="/" className="text-emerald-500 font-bold hover:underline">
            VENDExChat.IA
          </a>
        </p>
      </div>
    </div>
  );
}
