import type { OrderResponse } from "../../types";
import "./OrderConfirmation.css";

interface Props {
  order: OrderResponse;
  onBackToStore: () => void;
}

export function OrderConfirmation({ order, onBackToStore }: Props) {
  return (
    <div className="confirmation">
      <div className="confirmation__icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>
      <h2 className="confirmation__title">Pedido enviado</h2>
      <div className="confirmation__code">{order.public_id}</div>
      <p className="confirmation__message">
        Te contactaremos por WhatsApp para confirmar tu pedido.
      </p>
      <button className="confirmation__btn" onClick={onBackToStore}>
        Volver a la tienda
      </button>
    </div>
  );
}
