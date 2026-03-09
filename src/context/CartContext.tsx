import { createContext, useContext, useCallback, useState, type ReactNode } from "react";
import type { CartItem, Product } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, deliveryDay?: string) => void;
  removeItem: (productId: string, deliveryDay?: string) => void;
  updateQuantity: (productId: string, quantity: number, deliveryDay?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, deliveryDay?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) =>
        i.product.id === product.id && i.delivery_day === deliveryDay
      );
      if (existing) {
        return prev.map((i) =>
          (i.product.id === product.id && i.delivery_day === deliveryDay)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, delivery_day: deliveryDay }];
    });
  }, []);

  const removeItem = useCallback((productId: string, deliveryDay?: string) => {
    setItems((prev) => prev.filter((i) =>
      !(i.product.id === productId && i.delivery_day === deliveryDay)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, deliveryDay?: string) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) =>
        !(i.product.id === productId && i.delivery_day === deliveryDay)
      ));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId && i.delivery_day === deliveryDay) ? { ...i, quantity } : i)
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
