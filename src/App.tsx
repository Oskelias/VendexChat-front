import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";

const DEFAULT_SLUG = "morfi-demo";

type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
};

type Store = {
  id: string;
  name: string;
  slug: string;
  whatsapp: string | null;
};

function Storefront() {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug || DEFAULT_SLUG;

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Checkout Form State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorMsg("");
      try {
        const { data: storeData, error: storeError } = await supabase
          .from("stores")
          .select("id, name, slug, whatsapp")
          .eq("slug", currentSlug)
          .single();

        if (storeError) throw storeError;
        setStore(storeData);

        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, category_id, name, description, price")
          .eq("store_id", storeData.id)
          .eq("is_active", true);

        if (productsError) throw productsError;

        if (!productsData || productsData.length === 0) {
          // Mock data for demo if DB is empty
          const mockProducts: Product[] = [
            { id: '1', category_id: 'cat1', name: 'Hamburguesa Premium', description: 'Carne braseada, queso cheddar y panceta.', price: 1800 },
            { id: '2', category_id: 'cat1', name: 'Papas Fritas XL', description: 'Porción grande con dip de cheddar.', price: 950 },
            { id: '3', category_id: 'cat2', name: 'Gaseosa 500ml', description: 'Línea Coca-Cola bien fría.', price: 600 },
          ];
          setProducts(mockProducts);
        } else {
          setProducts(productsData);
        }
      } catch (e: any) {
        setErrorMsg(e.message || "No se pudo encontrar la tienda.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentSlug]);

  const addToCart = (productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) newCart[productId] -= 1;
      else delete newCart[productId];
      return newCart;
    });
  };

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return total + (product?.price || 0) * qty;
    }, 0);
  }, [cart, products]);

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store?.id || !store?.whatsapp) return;
    if (!customerName || !customerAddress) {
      alert("Por favor completa tu nombre y dirección.");
      return;
    }

    setSubmitting(true);
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          store_id: store.id,
          customer_name: customerName,
          customer_address: customerAddress,
          customer_notes: customerNotes,
          subtotal: cartTotal,
          total: cartTotal,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const itemsToInsert = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return {
          order_id: orderData.id,
          product_id: productId,
          quantity,
          price: product?.price || 0,
          name: product?.name || 'Producto'
        };
      });

      const { error: itemsError } = await supabase.from("order_items").insert(itemsToInsert);
      if (itemsError) throw itemsError;

      const cartItemsStr = itemsToInsert.map(i => `- ${i.name} x${i.quantity}`).join("\n");
      const message = `¡Nuevo Pedido! 🛍️\n\n*Cliente:* ${customerName}\n*Dirección:* ${customerAddress}\n\n*Items:*\n${cartItemsStr}\n\n*Total: $${cartTotal.toFixed(2)}*`;
      window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");

      setCart({});
      setIsCheckingOut(false);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Cargando catálogo...</div>;
  if (errorMsg) return <div className="error">{errorMsg}</div>;

  return (
    <div className="container">
      <header>
        <h1>{store?.name || "Tienda"}</h1>
        <p>Catálogo de Productos</p>
      </header>

      {isCheckingOut ? (
        <div className="checkout-form glass-panel">
          <h2>Tus Datos de Entrega</h2>
          <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="Nombre Completo" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
            <input placeholder="Dirección Exacta" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} required />
            <textarea placeholder="Notas (opcional)" value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => setIsCheckingOut(false)}>Volver</button>
              <button type="submit" className="primary" disabled={submitting}>
                {submitting ? "Procesando..." : "Confirmar por WhatsApp"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <main className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price">${product.price.toLocaleString()}</div>
                <div className="actions">
                  <button onClick={() => addToCart(product.id)}>Agregar</button>
                  {cart[product.id] && (
                    <div className="cart-controls">
                      <button onClick={() => removeFromCart(product.id)}>-</button>
                      <span>{cart[product.id]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </main>

          {Object.keys(cart).length > 0 && (
            <footer className="cart-summary">
              <p>Total: ${cartTotal.toLocaleString()}</p>
              <button className="primary" onClick={() => setIsCheckingOut(true)}>Ver Carrito / Comprar</button>
            </footer>
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${DEFAULT_SLUG}`} replace />} />
        <Route path="/:slug" element={<Storefront />} />
      </Routes>
    </BrowserRouter>
  );
}
