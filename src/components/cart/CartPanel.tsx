import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import { CartItem } from "./CartItem";
import "./CartPanel.css";

interface Props {
  onCheckout: () => void;
}

export function CartPanel({ onCheckout }: Props) {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-panel cart-panel--empty">
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <div className="cart-panel__header">
        <h2 className="cart-panel__title">
          Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
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
      <div className="cart-panel__footer">
        <div className="cart-panel__total">
          <span>Total</span>
          <span className="cart-panel__total-price">{formatPrice(totalPrice)}</span>
        </div>
        <button className="cart-panel__checkout" onClick={onCheckout}>
          Continuar al pedido
        </button>
      </div>
    </div>
  );
}
