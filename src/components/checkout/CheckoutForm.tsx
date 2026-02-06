import { useState, type FormEvent } from "react";
import type { DeliveryType } from "../../types";
import "./CheckoutForm.css";

interface Props {
  onSubmit: (data: {
    customer_name: string;
    customer_whatsapp: string;
    delivery_type: DeliveryType;
    delivery_address?: string;
  }) => void;
  loading: boolean;
}

export function CheckoutForm({ onSubmit, loading }: Props) {
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
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="checkout-form__title">Datos del pedido</h2>

      <label className="checkout-form__label">
        <span>Nombre</span>
        <input
          className="checkout-form__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          required
        />
      </label>

      <label className="checkout-form__label">
        <span>WhatsApp</span>
        <input
          className="checkout-form__input"
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+52 123 456 7890"
          required
        />
      </label>

      <fieldset className="checkout-form__fieldset">
        <legend>Tipo de entrega</legend>
        <div className="checkout-form__radio-group">
          <label className={`checkout-form__radio ${deliveryType === "pickup" ? "checkout-form__radio--active" : ""}`}>
            <input
              type="radio"
              name="delivery_type"
              value="pickup"
              checked={deliveryType === "pickup"}
              onChange={() => setDeliveryType("pickup")}
            />
            <span>Recoger en tienda</span>
          </label>
          <label className={`checkout-form__radio ${deliveryType === "delivery" ? "checkout-form__radio--active" : ""}`}>
            <input
              type="radio"
              name="delivery_type"
              value="delivery"
              checked={deliveryType === "delivery"}
              onChange={() => setDeliveryType("delivery")}
            />
            <span>Envío a domicilio</span>
          </label>
        </div>
      </fieldset>

      {deliveryType === "delivery" && (
        <label className="checkout-form__label">
          <span>Dirección de entrega</span>
          <textarea
            className="checkout-form__input checkout-form__textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Calle, número, colonia, ciudad..."
            required
          />
        </label>
      )}

      <button className="checkout-form__submit" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar pedido"}
      </button>
    </form>
  );
}
