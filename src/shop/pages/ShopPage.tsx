import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShopData } from "../hooks/useShopData";
import { useCartState } from "../state/useCartStore";
import { StoreHeader } from "../components/StoreHeader";
import { CategoryChips } from "../components/CategoryChips";
import { ProductCard } from "../components/ProductCard";
import { CartDrawer } from "../components/CartDrawer";
import { CartBar } from "../components/CartBar";
import { ProductQuickViewModal } from "../components/ProductQuickViewModal";
import { StoreInfoSections } from "../components/StoreInfoSections";
import { ChatBotWidget } from "../components/ChatBotWidget";
import type { Product } from "../../types";

export default function ShopPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useShopData(slug);
    const { items, addItem, updateQuantity, clearCart, totalItems, totalPrice, getItemQuantity } = useCartState();

    const [activeCategory, setActiveCategory] = useState<string | number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    const filteredCategories = useMemo(() => {
        if (!data) return [];

        const allWithFilteredProducts = data.categories.map(cat => ({
            ...cat,
            products: (cat.products || []).filter(p => {
                return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description?.toLowerCase().includes(searchTerm.toLowerCase());
            })
        })).filter(cat => cat.products.length > 0);

        // Si no hay categoría activa, intentamos poner la primera que tenga productos
        if (activeCategory === null && allWithFilteredProducts.length > 0) {
            // Usamos setTimeout o un useEffect separado para evitar warnings de "update during render"
            // Pero como estamos en useMemo, lo mejor es que el componente lo maneje.
            // Por ahora, solo filtramos si hay categoría.
        }

        if (activeCategory !== null) {
            return allWithFilteredProducts.filter(cat => String(cat.id) === String(activeCategory));
        }

        return allWithFilteredProducts;
    }, [data, searchTerm, activeCategory]);

    // Efecto para asegurar que siempre haya una categoría seleccionada si no estamos en modo "Search" global
    useEffect(() => {
        if (!activeCategory && data?.categories && data.categories.length > 0 && !searchTerm) {
            setActiveCategory(data.categories[0].id);
        }
    }, [data, activeCategory, searchTerm]);

    // Efecto para inyectar el color primario dinámico de la tienda
    useEffect(() => {
        if (data?.store?.primary_color) {
            document.documentElement.style.setProperty('--primary-color', data.store.primary_color);
        }
    }, [data]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
                <div className="w-12 h-12 border-4 border-primary-dynamic border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Cargando tienda...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                <div className="text-slate-300 mb-4 text-6xl">⚠️</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Tienda no encontrada</h2>
                <p className="text-slate-400 font-medium max-w-sm">No pudimos encontrar la tienda <span className="text-slate-900 font-bold">"{slug}"</span>. Verifica que la URL sea correcta.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24">
            <StoreHeader
                name={data.store.name}
                logo={data.store.logo_url || ""}
                banner={data.store.banner_url || ""}
                description={data.store.description || ""}
                address={data.store.address || ""}
                whatsapp={data.store.whatsapp || data.store.phone || ""}
                instagram={data.store.instagram || ""}
                facebook={data.store.facebook || ""}
                totalItems={totalItems}
                onSearch={setSearchTerm}
                onChatClick={() => setIsChatOpen(true)}
                onCartClick={() => setIsCartOpen(true)}
            />

            <CategoryChips
                categories={data.categories}
                activeId={activeCategory}
                onSelect={setActiveCategory}
            />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No se encontraron productos</p>
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
                                    <div key={p.id} onClick={() => !getItemQuantity(p.id) && setQuickViewProduct(p)} className="cursor-pointer">
                                        <ProductCard
                                            product={p}
                                            quantity={getItemQuantity(p.id)}
                                            onAdd={(prod) => addItem(prod)}
                                            onUpdate={updateQuantity}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </main>

            {/* Info Sections: Nosotros / Zonas / Horarios */}
            <StoreInfoSections
                description={data.store.description}
                address={data.store.address}
                whatsapp={data.store.whatsapp || data.store.phone || ""}
                instagram={data.store.instagram}
                facebook={data.store.facebook}
                schedule={data.store.physical_schedule || data.store.schedule}
                storeName={data.store.name}
                metadata={data.store.metadata}
            />

            <CartBar
                totalItems={totalItems}
                totalPrice={totalPrice}
                onClick={() => setIsCartOpen(true)}
            />

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={items}
                totalPrice={totalPrice}
                onUpdateQuantity={updateQuantity}
                onClear={clearCart}
                whatsappNumber={data.store.whatsapp || data.store.phone || ""}
                storeId={data.store.id}
                couponsEnabled={data.store.coupons_enabled}
            />

            <ProductQuickViewModal
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                product={quickViewProduct}
                quantity={quickViewProduct ? getItemQuantity(quickViewProduct.id) : 0}
                onAdd={addItem}
                onUpdate={updateQuantity}
            />

            <ChatBotWidget
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                storeName={data.store.name}
                storeDescription={data.store.description || undefined}
                storeAddress={data.store.address || undefined}
                whatsappNumber={data.store.whatsapp || data.store.phone || ""}
                products={data.categories.flatMap(c => c.products || [])}
            />
        </div>
    );
}
