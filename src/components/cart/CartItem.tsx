import type { CartItem as CartItemType } from "../../types";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <span className="cart-item__name">{item.product.name}</span>
        <span className="cart-item__price">
          {formatPrice(item.product.price * item.quantity)}
        </span>
      </div>
      <div className="cart-item__controls">
        <button
          className="cart-item__btn"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="cart-item__qty">{item.quantity}</span>
        <button
          className="cart-item__btn"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
        >
          +
        </button>
        <button className="cart-item__remove" onClick={() => removeItem(item.product.id)}>
          ×
        </button>
      </div>
    </div>
  );
}
