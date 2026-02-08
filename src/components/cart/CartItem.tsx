import type { CartItem as CartItemType } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import "./CartItem.css";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <span className="cart-item__name">{item.product.name}</span>
        <span className="cart-item__line-total">
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
      </div>
      <button className="cart-item__remove" onClick={() => removeItem(item.product.id)}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
        </svg>
      </button>
    </div>
  );
}
