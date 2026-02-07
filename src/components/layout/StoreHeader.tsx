import type { Store } from "../../types";
import "./StoreHeader.css";

interface Props {
  store: Store;
}

export function StoreHeader({ store }: Props) {
  if (!store) return null;

  return (
    <header className="store-header">
      <div className="store-header__inner">
        {store.logo_url && (
          <img
            className="store-header__logo"
            src={store.logo_url}
            alt={`${store.name ?? ""} logo`}
          />
        )}
        <h1 className="store-header__name">{store.name ?? "Tienda"}</h1>
      </div>
    </header>
  );
}
