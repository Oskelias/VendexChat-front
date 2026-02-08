import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import { CartItem } from "./CartItem";
import "./CartPanel.css";

interface Props {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartPanel({ onCheckout, onContinueShopping }: Props) {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-panel cart-panel--empty">
        <div className="cart-panel--empty-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        <p className="cart-panel--empty-text">Tu carrito esta vacio</p>
        <button className="cart-panel__continue" onClick={onContinueShopping}>
          Seguir comprando
        </button>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <div className="cart-panel__header">
        <h2 className="cart-panel__title">
          Tu pedido ({totalItems})
        </h2>
        <button className="cart-panel__clear" onClick={clearCart}>
          Vaciar
        </button>
      </div>

      <div className="cart-panel__items">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="cart-panel__summary">
        <div className="cart-panel__summary-row">
          <span>Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="cart-panel__summary-total">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <button className="cart-panel__checkout" onClick={onCheckout}>
        Confirmar pedido
      </button>
      <button className="cart-panel__continue" onClick={onContinueShopping}>
        Seguir comprando
      </button>
    </div>
  );
}
