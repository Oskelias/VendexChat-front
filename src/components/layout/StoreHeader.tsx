import type { Store } from "../../types";
import { useCart } from "../../context/CartContext";
import "./StoreHeader.css";

interface Props {
  store: Store;
  onCartClick?: () => void;
}

export function StoreHeader({ store, onCartClick }: Props) {
  const { totalItems } = useCart();

  return (
    <header className="store-header">
      <div className="store-header__inner">
        <div className="store-header__identity">
          {store.logo_url && (
            <img
              className="store-header__logo"
              src={store.logo_url}
              alt={`${store.name} logo`}
            />
          )}
          <div>
            <p className="store-header__label">Tienda</p>
            <h1 className="store-header__name">{store.name}</h1>
          </div>
        </div>
        <button
          className="store-header__cart"
          onClick={onCartClick}
          type="button"
          aria-label="Ver carrito"
        >
          <span className="store-header__cart-icon" aria-hidden>
            🛒
          </span>
          {totalItems > 0 && <span className="store-header__cart-badge">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}
