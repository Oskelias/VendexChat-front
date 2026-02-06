import { useCart } from "../../context/CartContext";
import "./FloatingCartButton.css";

interface Props {
  onClick: () => void;
}

export function FloatingCartButton({ onClick }: Props) {
  const { totalItems, totalPrice } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  if (totalItems === 0) return null;

  return (
    <button className="floating-cart" onClick={onClick}>
      <span className="floating-cart__badge">{totalItems}</span>
      <span className="floating-cart__label">Ver carrito</span>
      <span className="floating-cart__price">{formatPrice(totalPrice)}</span>
    </button>
  );
}
