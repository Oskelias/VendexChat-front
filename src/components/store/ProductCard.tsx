import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import "./ProductCard.css";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);

  return (
    <div className="product-card">
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
          <div className="product-card__prices">
            {product.offer_price != null && (
              <span className="product-card__original-price">
                {formatPrice(product.offer_price)}
              </span>
            )}
            <span className="product-card__price">{formatPrice(product.price)}</span>
          </div>
          <button className="product-card__add" onClick={() => addItem(product)}>
            {inCart ? `En carrito (${inCart.quantity})` : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
