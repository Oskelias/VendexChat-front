import { useState, useCallback, useMemo } from "react";
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
  const { items, clearCart } = useCart();

  const [view, setView] = useState<View>("catalog");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(`category-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
  }, []);

  if (loading) {
    return (
      <div className="store-page__loading">
        <div className="store-page__spinner" />
        <p>Cargando tienda...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="store-page__error">
        <h2>Tienda no encontrada</h2>
        <p>{error || "No se pudo cargar la tienda."}</p>
      </div>
    );
  }

  const categories = data.categories ?? [];
  const query = search.trim().toLowerCase();
  const filteredCategories = useMemo(() => {
    return categories.map((category) => {
      const products = category.products ?? category.items ?? [];
      const filteredProducts = query
        ? products.filter((product) => {
            const haystack = `${product.name} ${product.description ?? ""}`.toLowerCase();
            return haystack.includes(query);
          })
        : products;
      return { ...category, products: filteredProducts };
    });
  }, [categories, query]);
  const hasResults = filteredCategories.some((category) => (category.products ?? []).length > 0);

  return (
    <div className="store-page">
      <div className="store-page__shell">
        {data.store && <StoreHeader store={data.store} onCartClick={() => setView("cart")} />}

        {view === "catalog" && (
          <>
            <div className="store-page__search">
              <input
                type="search"
                placeholder="Buscar..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <span className="store-page__search-icon" aria-hidden>
                🔍
              </span>
            </div>
            {filteredCategories.length > 0 && (
              <CategoryNav
                categories={filteredCategories}
                activeId={activeCategory}
                onSelect={handleCategorySelect}
              />
            )}
            <main className="store-page__content">
              {filteredCategories.map((cat) => (
                <CategorySection key={cat.id} category={cat} />
              ))}
              {!hasResults && (
                <div className="store-page__empty">
                  <p>No encontramos productos para tu búsqueda.</p>
                </div>
              )}
            </main>
            <FloatingCartButton onClick={() => setView("cart")} />
          </>
        )}

        {view === "cart" && (
          <>
            <div className="store-page__back-bar">
              <button className="store-page__back" onClick={() => setView("catalog")}>
                &larr; Seguir comprando
              </button>
            </div>
            <CartPanel onCheckout={() => setView("checkout")} />
          </>
        )}

        {view === "checkout" && (
          <>
            <div className="store-page__back-bar">
              <button className="store-page__back" onClick={() => setView("cart")}>
                &larr; Volver al carrito
              </button>
            </div>
            {orderError && <p className="store-page__order-error">{orderError}</p>}
            <CheckoutForm onSubmit={handleCheckout} loading={orderLoading} />
          </>
        )}

        {view === "confirmation" && order && (
          <OrderConfirmation order={order} onBackToStore={handleBackToStore} />
        )}
      </div>
    </div>
  );
}
