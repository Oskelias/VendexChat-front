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
import { WeeklyMenuGrid } from "../components/WeeklyMenuGrid";
import { GlobalAnnouncement } from "../components/GlobalAnnouncement";
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

    // New: Mode state for Bespoke stores
    const [viewMode, setViewMode] = useState<'standard' | 'weekly'>('standard');

    // Auto-switch to weekly if enabled in metadata
    useEffect(() => {
        if (data?.store?.metadata?.enable_weekly_planning) {
            setViewMode('weekly');
        }
    }, [data]);

    const filteredCategories = useMemo(() => {
        if (!data) return [];

        const allWithFilteredProducts = data.categories.map(cat => ({
            ...cat,
            products: (cat.products || []).filter(p => {
                return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description?.toLowerCase().includes(searchTerm.toLowerCase());
            })
        })).filter(cat => cat.products.length > 0);

        if (activeCategory !== null) {
            return allWithFilteredProducts.filter(cat => String(cat.id) === String(activeCategory));
        }

        return allWithFilteredProducts;
    }, [data, searchTerm, activeCategory]);

    useEffect(() => {
        if (!activeCategory && data?.categories && data.categories.length > 0 && !searchTerm) {
            setActiveCategory(data.categories[0].id);
        }
    }, [data, activeCategory, searchTerm]);

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
            <GlobalAnnouncement announcement={data.announcement} />
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
                announcement={data.announcement}
                onSearch={setSearchTerm}
                onChatClick={() => setIsChatOpen(true)}
                onCartClick={() => setIsCartOpen(true)}
            />

            {data.store.metadata?.enable_weekly_planning && (
                <div className="max-w-4xl mx-auto px-4 mt-8 flex justify-center">
                    <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1 border border-slate-100">
                        <button
                            onClick={() => setViewMode('standard')}
                            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${viewMode === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                                }`}
                        >
                            Menú Diario
                        </button>
                        <button
                            onClick={() => setViewMode('weekly')}
                            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${viewMode === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                                }`}
                        >
                            Plan Semanal
                        </button>
                    </div>
                </div>
            )}

            {viewMode === 'standard' && (
                <CategoryChips
                    categories={data.categories}
                    activeId={activeCategory}
                    onSelect={setActiveCategory}
                />
            )}

            <main className="max-w-4xl mx-auto px-4 py-8">
                {viewMode === 'weekly' ? (
                    <WeeklyMenuGrid
                        categories={data.categories}
                        primaryColor={data.store.primary_color}
                        onItemClick={setQuickViewProduct}
                    />
                ) : filteredCategories.length === 0 ? (
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

            <StoreInfoSections
                description={data.store.description}
                address={data.store.address}
                whatsapp={data.store.whatsapp || data.store.phone || ""}
                instagram={data.store.instagram}
                facebook={data.store.facebook}
                schedule={(() => {
                    const phys = data.store.physical_schedule || data.store.schedule;
                    const hasOpenPhysical = phys && Object.values(phys).some((d: any) => d?.open);
                    return hasOpenPhysical ? phys : (data.store.online_schedule || phys);
                })()}
                storeName={data.store.name}
                metadata={data.store.metadata}
                footerMessage={data.store.footer_message}
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
                deliveryCost={data.store.delivery_cost || 0}
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
                aiPrompt={data.store.metadata?.ai_prompt || data.store.ai_prompt}
                welcomeMessage={data.store.welcome_message}
            />
        </div>
    );
}
