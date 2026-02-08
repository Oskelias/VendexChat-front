import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import "./FloatingCartButton.css";

interface Props {
  onClick: () => void;
}

export function FloatingCartButton({ onClick }: Props) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <button className="floating-cart" onClick={onClick}>
      <span className="floating-cart__badge">{totalItems}</span>
      <span className="floating-cart__label">Ver pedido</span>
      <span className="floating-cart__total">{formatPrice(totalPrice)}</span>
    </button>
  );
}
