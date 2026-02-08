import { useState, type FormEvent } from "react";
import type { DeliveryType, CartItem } from "../../types";
import { formatPrice } from "../../utils/format";
import "./CheckoutForm.css";

interface Props {
  items: CartItem[];
  totalPrice: number;
  onSubmit: (data: {
    customer_name: string;
    customer_whatsapp: string;
    delivery_type: DeliveryType;
    delivery_address?: string;
  }) => void;
  loading: boolean;
}

export function CheckoutForm({ items, totalPrice, onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("pickup");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      customer_name: name.trim(),
      customer_whatsapp: whatsapp.trim(),
      delivery_type: deliveryType,
      ...(deliveryType === "delivery" && address.trim()
        ? { delivery_address: address.trim() }
        : {}),
    });
  };

  return (
    <form className="checkout" onSubmit={handleSubmit}>
      <div className="checkout__section">
        <h3 className="checkout__section-title">Resumen del pedido</h3>
        {items.map((item) => (
          <div key={item.product.id} className="checkout__order-item">
            <span className="checkout__order-item-name">{item.product.name}</span>
            <span className="checkout__order-item-qty">x{item.quantity}</span>
            <span className="checkout__order-item-price">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
        <div className="checkout__order-total">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="checkout__section">
        <h3 className="checkout__section-title">Datos de contacto</h3>

        <label className="checkout__label">
          <span className="checkout__label-text">Nombre</span>
          <input
            className="checkout__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            required
          />
        </label>

        <label className="checkout__label">
          <span className="checkout__label-text">
            WhatsApp{" "}
            <span className="checkout__label-hint">(con codigo de pais)</span>
          </span>
          <input
            className="checkout__input"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+52 123 456 7890"
            required
          />
        </label>
      </div>

      <div className="checkout__section">
        <h3 className="checkout__section-title">Tipo de entrega</h3>
        <div className="checkout__radio-group">
          <label
            className={`checkout__radio-card${deliveryType === "pickup" ? " checkout__radio-card--active" : ""}`}
          >
            <input
              type="radio"
              name="delivery_type"
              value="pickup"
              checked={deliveryType === "pickup"}
              onChange={() => setDeliveryType("pickup")}
            />
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
            </svg>
            <span>Recoger en tienda</span>
          </label>
          <label
            className={`checkout__radio-card${deliveryType === "delivery" ? " checkout__radio-card--active" : ""}`}
          >
            <input
              type="radio"
              name="delivery_type"
              value="delivery"
              checked={deliveryType === "delivery"}
              onChange={() => setDeliveryType("delivery")}
            />
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM19.5 9.5l1.96 2.5H17V9.5h2.5zM6 18.5c.83 0 1.5-.67 1.5-1.5S6.83 15.5 6 15.5 4.5 16.17 4.5 17 5.17 18.5 6 18.5zM20 8h-3V4H1v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
            </svg>
            <span>Envio a domicilio</span>
          </label>
        </div>

        {deliveryType === "delivery" && (
          <label className="checkout__label" style={{ marginTop: "0.75rem" }}>
            <span className="checkout__label-text">Direccion de entrega</span>
            <textarea
              className="checkout__input checkout__textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, numero, colonia, ciudad..."
              required
            />
          </label>
        )}
      </div>

      <button className="checkout__submit" type="submit" disabled={loading}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
        {loading ? "Enviando..." : "Enviar pedido por WhatsApp"}
      </button>
    </form>
  );
}
