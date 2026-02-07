import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import "./ProductCard.css";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, items, updateQuantity } = useCart();
  const inCart = items.find((i) => i.product.id === product.id);
  const quantity = inCart?.quantity ?? 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

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
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.available ? (
            <div className="product-card__actions">
              <button
                className="product-card__action"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                type="button"
                disabled={quantity === 0}
                aria-label={`Quitar ${product.name}`}
              >
                -
              </button>
              <span className="product-card__qty">{quantity}</span>
              <button
                className="product-card__action"
                onClick={() => addItem(product)}
                type="button"
                aria-label={`Agregar ${product.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <span className="product-card__unavailable">No disponible</span>
          )}
        </div>
      </div>
    </div>
  );
}
