import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import type { Session } from "@supabase/supabase-js";

const TENANT_SLUG = "morfi-demo";

type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number; // Changed from final_price
};

type Store = {
  id: string;
  name: string;
  slug: string;
  whatsapp: string | null; // Changed from phone
};

export default function App() {
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [session, setSession] = useState<Session | null>(null);

  // Checkout Form State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: storeData, error: storeError } = await supabase
          .from("stores")
          .select("id, name, slug, whatsapp")
          .eq("slug", TENANT_SLUG)
          .single();

        if (storeError) throw storeError;
        setStore(storeData);

        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, category_id, name, description, price")
          .eq("store_id", storeData.id)
          .eq("is_active", true);

        if (productsError) throw productsError;

        // Demo fallback if no products are found in Supabase yet
        if (!productsData || productsData.length === 0) {
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
        setMsg(e.message || String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
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
      // 1. Create the order
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

      // 2. Create order items
      const itemsToInsert = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        return {
          order_id: orderData.id,
          product_id: productId,
          quantity,
          price: product?.price || 0,
          name: product?.name || 'Producto desconocido'
        };
      });

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      // 3. Formato WhatsApp y Redirección
      const cartItemsStr = itemsToInsert
        .map(item => `- ${item.name} x${item.quantity} ($${item.price * item.quantity})`)
        .join("\n");

      const message = `¡Nuevo Pedido! 🛍️\n\n*Cliente:* ${customerName}\n*Dirección:* ${customerAddress}\n*Notas:* ${customerNotes || 'Sin notas'}\n\n*Items:*\n${cartItemsStr}\n\n*Total: $${cartTotal.toFixed(2)}*\n\nNro de Pedido: ${orderData.id.slice(0, 8)}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodedMessage}`;

      // Limpiar y Resetear
      setCart({});
      setIsCheckingOut(false);
      setCustomerName("");
      setCustomerAddress("");
      setCustomerNotes("");

      window.open(whatsappUrl, "_blank");
    } catch (e: any) {
      alert("Error al guardar el pedido: " + (e.message || String(e)));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Cargando tienda...</div>;
  if (msg) return <div className="error">Error: {msg}</div>;

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>{store?.name || "VendeXChat"}</h1>
          <p>Catálogo Público</p>
        </div>
        {session && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>{session.user.email}</p>
            <button onClick={() => supabase.auth.signOut()} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>

      {!session ? (
        <Auth />
      ) : isCheckingOut ? (
        <div className="checkout-form glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Finalizar Pedido</h2>
          <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <label>
              Nombre Completo:
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required
                style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: 'white' }} />
            </label>
            <label>
              Dirección de Entrega:
              <input type="text" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} required
                style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: 'white' }} />
            </label>
            <label>
              Notas Adicionales:
              <textarea value={customerNotes} onChange={e => setCustomerNotes(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: 'white', minHeight: '100px' }} />
            </label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => setIsCheckingOut(false)} style={{ flex: 1 }}>Volver</button>
              <button type="submit" className="primary" style={{ flex: 2 }} disabled={submitting}>
                {submitting ? "Confirmando..." : "Confirmar Pedido"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <main>
            <div className="product-list">
              {products.length === 0 ? (
                <p>No hay productos disponibles.</p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>{product.description || "Sin descripción."}</p>
                    <div className="price">${product.price.toLocaleString()}</div>
                    <div className="actions">
                      <button onClick={() => addToCart(product.id)}>Agregar al carrito</button>
                      {cart[product.id] && (
                        <div className="cart-controls">
                          <span>{cart[product.id]}</span>
                          <button onClick={() => removeFromCart(product.id)}>-</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>

          <footer className="cart-summary">
            <h2>Tu Carrito</h2>
            {Object.keys(cart).length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <div>
                <p>Total: ${cartTotal.toLocaleString()}</p>
                <button className="primary" onClick={() => setIsCheckingOut(true)}>
                  Finalizar Pedido
                </button>
              </div>
            )}
          </footer>
        </>
      )}
    </div>
  );
}
