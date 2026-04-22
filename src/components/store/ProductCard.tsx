import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import { getProductImageUrl } from "../../utils/imageUrl";
import "./ProductCard.css";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, updateQuantity, items } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const hasOffer = product.offer_price != null && product.offer_price < product.price;

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        {product.image_url ? (
          <img
            className="product-card__image"
            src={getProductImageUrl(product.image_url, 256)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={256}
            height={256}
          />
        ) : (
          <div className="product-card__placeholder">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5h-3.17L15.41 3.59 14 2H10L8.59 3.59 7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h4.05l1.83-2h4.24l1.83 2H20v12zm-8-11c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
            </svg>
          </div>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        {product.description && (
          <p className="product-card__desc">{product.description}</p>
        )}
        <div className="product-card__footer">
          <div className="product-card__prices">
            {hasOffer && (
              <span className="product-card__original">
                {formatPrice(product.price)}
              </span>
            )}
            <span className={`product-card__price${hasOffer ? " product-card__price--offer" : ""}`}>
              {hasOffer ? formatPrice(product.offer_price!) : formatPrice(product.price)}
            </span>
          </div>
          {quantity === 0 ? (
            <button className="product-card__add" onClick={() => addItem(product)}>
              Agregar
            </button>
          ) : (
            <div className="product-card__qty-controls">
              <button
                className="product-card__qty-btn"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                -
              </button>
              <span className="product-card__qty-count">{quantity}</span>
              <button
                className="product-card__qty-btn"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
