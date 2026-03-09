import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useCatalog } from "../hooks/useCatalog";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/catalog";
import { StoreHeader } from "../components/layout/StoreHeader";
import { CategoryNav } from "../components/store/CategoryNav";
import { CategorySection } from "../components/store/CategorySection";
import { FloatingCartButton } from "../components/cart/FloatingCartButton";
import { CartPanel } from "../components/cart/CartPanel";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { OrderConfirmation } from "../components/checkout/OrderConfirmation";
import type { DeliveryType, OrderResponse } from "../types";
import "./StorePage.css";

type View = "catalog" | "cart" | "checkout" | "confirmation";

export function StorePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useCatalog(slug);
  const { items, totalPrice, clearCart } = useCart();

  const [view, setView] = useState<View>("catalog");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // const [search, setSearch] = useState("");
  // const [search] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const handleCheckout = useCallback(
    async (formData: {
      customer_name: string;
      customer_whatsapp: string;
      delivery_type: DeliveryType;
      delivery_address?: string;
    }) => {
      if (!data) return;
      setOrderLoading(true);
      setOrderError(null);
      try {
        const res = await createOrder({
          store_id: data.store.id,
          ...formData,
          items: items.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
          })),
        });
        setOrder(res);
        clearCart();
        setView("confirmation");
      } catch (err) {
        setOrderError(err instanceof Error ? err.message : "Error al enviar pedido");
      } finally {
        setOrderLoading(false);
      }
    },
    [data, items, clearCart]
  );

  const handleBackToStore = useCallback(() => {
    setView("catalog");
    setOrder(null);
    setActiveCategory(null);
    window.scrollTo({ top: 0 });
  }, []);

  if (loading) {
    return (
      <div className="store-page__loading">
        <div className="store-page__spinner" />
        <p className="store-page__loading-text">Cargando tienda...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="store-page__error">
        <div className="store-page__error-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h2>Tienda no encontrada</h2>
        <p>{error || "No se pudo cargar la tienda."}</p>
      </div>
    );
  }

  const categories = data.categories ?? [];
  const topCategories = categories.slice(0, 4);
  const sidebarCategories = categories.slice(4);
  const hasSidebar = sidebarCategories.length > 0;

  return (
    <div className="store-page">
      <div className="store-page__shell">
        {data.store && <StoreHeader store={data.store} onCartClick={() => setView("cart")} />}

        {view === "catalog" && (
          <>
            {topCategories.length > 0 && (
              <CategoryNav
                categories={topCategories}
                activeId={activeCategory}
                onSelect={setActiveCategory}
              />
            )}
            {hasSidebar ? (
              <div className="store-page__sidebar-layout">
                <aside className="store-page__sidebar">
                  <CategoryNav
                    categories={sidebarCategories}
                    activeId={activeCategory}
                    onSelect={setActiveCategory}
                    vertical
                  />
                </aside>
                <main className="store-page__content store-page__content--sidebar">
                  {categories.map((cat) => (
                    <CategorySection key={cat.id} category={cat} />
                  ))}
                </main>
              </div>
            ) : (
              <main className="store-page__content">
                {categories.map((cat) => (
                  <CategorySection key={cat.id} category={cat} />
                ))}
              </main>
            )}
            <FloatingCartButton onClick={() => setView("cart")} />
          </>
        )}

        {view === "cart" && (
          <>
            <div className="store-page__back-bar">
              <button className="store-page__back" onClick={() => setView("catalog")}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Seguir comprando
              </button>
            </div>
            <CartPanel
              onCheckout={() => setView("checkout")}
              onContinueShopping={() => setView("catalog")}
            />
          </>
        )}

        {view === "checkout" && (
          <>
            <div className="store-page__back-bar">
              <button className="store-page__back" onClick={() => setView("cart")}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Volver al carrito
              </button>
            </div>
            {orderError && <p className="store-page__order-error">{orderError}</p>}
            <CheckoutForm
              items={items}
              totalPrice={totalPrice}
              onSubmit={handleCheckout}
              loading={orderLoading}
            />
          </>
        )}

        {view === "confirmation" && order && (
          <OrderConfirmation order={order} onBackToStore={handleBackToStore} />
        )}
      </div>
    </div>
  );
}
