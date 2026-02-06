import type { OrderResponse } from "../../types";
import "./OrderConfirmation.css";

interface Props {
  order: OrderResponse;
  onBackToStore: () => void;
}

export function OrderConfirmation({ order, onBackToStore }: Props) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__icon">&#10003;</div>
      <h2 className="order-confirmation__title">Pedido enviado</h2>
      <p className="order-confirmation__id">
        Código: <strong>{order.public_id}</strong>
      </p>
      <p className="order-confirmation__total">
        Total: <strong>{formatPrice(order.total)}</strong>
      </p>
      <p className="order-confirmation__status">
        Estado: <strong>{order.status}</strong>
      </p>
      <p className="order-confirmation__msg">
        Recibirás confirmación por WhatsApp.
      </p>
      <button className="order-confirmation__btn" onClick={onBackToStore}>
        Volver a la tienda
      </button>
    </div>
  );
}
