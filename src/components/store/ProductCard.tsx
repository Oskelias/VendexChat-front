import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  return (
    <div className={`product-card ${!product.available ? "product-card--unavailable" : ""}`}>
      {product.image_url && (
        <img
          className="product-card__image"
          src={product.image_url}
          alt={product.name}
          loading="lazy"
        />
      )}
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        {product.description && (
          <p className="product-card__desc">{product.description}</p>
        )}
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.available ? (
            <button className="product-card__add" onClick={() => addItem(product)}>
              {inCart ? `En carrito (${inCart.quantity})` : "Agregar"}
            </button>
          ) : (
            <span className="product-card__unavailable">No disponible</span>
          )}
        </div>
      </div>
    </div>
  );
}
