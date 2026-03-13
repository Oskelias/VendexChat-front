import { useState } from "react";
import { X, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";
import { type CartItem } from "../../types";
import { validateCoupon, createOrder } from "../../api/catalog";
import { sanitizePhoneNumber } from "../../utils/format";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    totalPrice: number;
    onUpdateQuantity: (id: string | number, delta: number, deliveryDay?: string) => void;
    onClear: () => void;
    whatsappNumber: string;
    storeId: string;
    couponsEnabled?: boolean;
    deliveryCost?: number;
    metadata?: any;
}

export function CartDrawer({
    isOpen,
    onClose,
    items,
    totalPrice,
    onUpdateQuantity,
    onClear,
    whatsappNumber,
    storeId,
    couponsEnabled = true,
    deliveryCost = 0,
    metadata = {}
}: CartDrawerProps) {
    const [deliveryType, setDeliveryType] = useState<"envio" | "retiro">("envio");
    const [address, setAddress] = useState("");
    const [deliveryZone, setDeliveryZone] = useState("");

    // Determine default payment method
    const enabledMethods = metadata?.payment_methods || { cash: true };
    const initialMethod = Object.keys(enabledMethods).find(k => enabledMethods[k]) || "Efectivo";

    const [paymentMethod, setPaymentMethod] = useState(initialMethod === "cash" ? "Efectivo" : initialMethod === "transfer" ? "Transferencia" : initialMethod);
    const [notes, setNotes] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerWhatsapp, setCustomerWhatsapp] = useState("");
    const [customerCompany, setCustomerCompany] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderInfo, setOrderInfo] = useState<{ number: string, id: string } | null>(null);

    if (!isOpen) return null;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsValidating(true);
        setCouponError("");
        try {
            const coupon = await validateCoupon(couponCode, storeId);
            if (totalPrice < coupon.min_purchase_amount) {
                throw new Error(`Este cupón requiere una compra mínima de $${coupon.min_purchase_amount.toLocaleString()}`);
            }
            setAppliedCoupon(coupon);
            setCouponCode("");
        } catch (err: any) {
            setCouponError(err.message || "Error al validar cupón");
            setAppliedCoupon(null);
        } finally {
            setIsValidating(false);
        }
    };

    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        let discount = 0;
        const { type, value, applicable_products, applicable_categories } = appliedCoupon;
        switch (type) {
            case 1: discount = totalPrice * (value / 100); break;
            case 2: discount = value; break;
            case 3:
                const items3 = items.filter(i => (applicable_products || []).includes(i.product.id));
                discount = items3.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) * (value / 100);
                break;
            case 4:
                const items4 = items.filter(i => (applicable_products || []).includes(i.product.id));
                if (items4.length > 0) discount = value;
                break;
            case 5:
                const items5 = items.filter(i => (applicable_categories || []).includes(i.product.category_id));
                discount = items5.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) * (value / 100);
                break;
            case 6:
                const items6 = items.filter(i => (applicable_categories || []).includes(i.product.category_id));
                if (items6.length > 0) discount = value;
                break;
        }
        return Math.min(discount, totalPrice);
    };

    const discount = calculateDiscount();
    const currentShipping = deliveryType === 'envio' ? deliveryCost : 0;
    const finalTotal = totalPrice - discount + currentShipping;

    const isItemEligible = (item: CartItem) => {
        if (!appliedCoupon) return false;
        const { type, applicable_products, applicable_categories } = appliedCoupon;
        if (type === 3 || type === 4) return (applicable_products || []).includes(item.product.id);
        if (type === 5 || type === 6) return (applicable_categories || []).includes(item.product.category_id);
        return false;
    };

    const isProductSpecificCoupon = appliedCoupon && [3, 4, 5, 6].includes(appliedCoupon.type);
    const noEligibleProducts = isProductSpecificCoupon && discount === 0;

    const handleSendWhatsApp = async () => {
        if (!customerName.trim() || !customerWhatsapp.trim()) {
            alert("Por favor, completa tu nombre y WhatsApp.");
            return;
        }

        if (deliveryType === "envio") {
            if (!address.trim()) {
                alert("Por favor, ingresa tu dirección para el envío.");
                return;
            }
            if (!deliveryZone) {
                alert("Por favor, selecciona una zona de entrega.");
                return;
            }
        }

        if (!whatsappNumber || sanitizePhoneNumber(whatsappNumber).length < 8) {
            alert("Esta tienda no tiene un número de WhatsApp configurado correctamente para recibir pedidos.");
            return;
        }
        setIsSubmitting(true);
        try {
            // Try to save order to database, but don't block WhatsApp if it fails
            let dbSaveOk = true;
            let orderResult = null;
            try {
                const orderPayload = {
                    store_id: storeId,
                    customer_name: customerName,
                    customer_whatsapp: customerWhatsapp,
                    customer_company: customerCompany || undefined,
                    delivery_type: deliveryType === 'envio' ? 'delivery' : 'pickup',
                    delivery_address: deliveryType === 'envio' ? address : undefined,
                    delivery_zone: deliveryType === 'envio' ? deliveryZone : undefined,
                    payment_method: paymentMethod,
                    customer_notes: notes || undefined,
                    subtotal: totalPrice,
                    delivery_cost: currentShipping,
                    total: finalTotal,
                    coupon_id: appliedCoupon?.id,
                    items: items.map(i => ({
                        product_id: i.product.id,
                        quantity: i.quantity,
                        metadata: i.delivery_day ? { delivery_day: i.delivery_day } : undefined
                    }))
                };
                orderResult = await createOrder(orderPayload as any);
            } catch (dbErr: any) {
                console.error("Error al guardar pedido en BD:", dbErr);
                dbSaveOk = false;
            }

            let message = `*NUEVO PEDIDO ${orderResult?.order_number || ''}*\n`.trim() + `\n` + `------------------\n`;


            // Agrupar por día para el mensaje
            const grouped = items.reduce((acc, item) => {
                const day = item.delivery_day || 'Pedido General';
                if (!acc[day]) acc[day] = [];
                acc[day].push(item);
                return acc;
            }, {} as Record<string, typeof items>);

            Object.entries(grouped).forEach(([day, dayItems]) => {
                if (day !== 'Pedido General') message += `\n*ENTREGA: ${day.toUpperCase()}*\n`;
                dayItems.forEach(i => {
                    message += `- ${i.quantity}x ${i.product.name} — $${(i.product.price * i.quantity).toLocaleString()}\n`;
                });
            });

            if (appliedCoupon) {
                message += `\nSubtotal: $${totalPrice.toLocaleString()}\n` +
                    `Cupón: ${appliedCoupon.code} (-$${discount.toLocaleString()})\n`;
            }

            if (!dbSaveOk) {
                message += `\n⚠️ *AVISO: El pedido no se sincronizó con el panel. Usar estos detalles para procesar.*\n`;
            }

            message += `\n*TOTAL: $${finalTotal.toLocaleString()}*\n` +
                `------------------\n\n` +
                `*DETALLES DEL CLIENTE*\n` +
                `- Nombre: ${customerName}\n` +
                `- WhatsApp: ${customerWhatsapp}\n`;
            if (customerCompany) message += `- Empresa: ${customerCompany}\n`;
            message += `\n*DETALLES DE ENTREGA*\n` + `- Tipo: ${deliveryType === 'envio' ? 'Envío a domicilio' : 'Retiro en local'}\n`;
            if (deliveryType === 'envio') {
                message += `- Dirección: ${address}\n`;
                if (deliveryZone) message += `- Zona: ${deliveryZone}\n`;
            }
            message += `- Pago: ${paymentMethod}\n`;
            if (notes) message += `\n*OBSERVACIONES:*\n${notes}`;

            const encoded = encodeURIComponent(message);
            const cleanPhone = sanitizePhoneNumber(whatsappNumber);

            setOrderInfo({
                number: orderResult?.order_number || 'PENDIENTE',
                id: orderResult?.public_id || ''
            });
            setShowSuccess(true);
            onClear();

            // Open WhatsApp after a brief delay so they see the success screen
            setTimeout(() => {
                window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
            }, 1000);
        } catch (err: any) {
            console.error("Error al crear pedido:", err);
            alert("Error al procesar pedido: " + (err.message || "Error desconocido"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Tu Pedido</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {showSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">¡Pedido Enviado!</h3>
                            <p className="text-slate-500 mb-8">Gracias por tu compra. Ya hemos enviado los detalles a la tienda por WhatsApp.</p>

                            <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tu número de pedido</p>
                                <p className="text-2xl font-black text-slate-900">#{orderInfo?.number}</p>
                            </div>

                            <div className="space-y-4 w-full">
                                <button
                                    onClick={() => {
                                        const cleanPhone = sanitizePhoneNumber(whatsappNumber);
                                        window.open(`https://wa.me/${cleanPhone}`, '_blank');
                                    }}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                                >
                                    Abrir WhatsApp
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
                                >
                                    Cerrar y seguir navegando
                                </button>
                            </div>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(
                                items.reduce((acc, item) => {
                                    const day = item.delivery_day || 'General';
                                    if (!acc[day]) acc[day] = [];
                                    acc[day].push(item);
                                    return acc;
                                }, {} as Record<string, typeof items>)
                            ).map(([day, dayItems]) => (
                                <div key={day} className="space-y-3">
                                    {day !== 'General' && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-widest">{day}</span>
                                            <div className="h-[1px] flex-1 bg-slate-100" />
                                        </div>
                                    )}
                                    {dayItems.map((item) => (
                                        <div key={`${item.product.id}-${item.delivery_day}`} className={`flex gap-4 items-center p-3 bg-white border rounded-2xl shadow-sm ${isItemEligible(item) ? 'border-emerald-400 ring-1 ring-emerald-200' : 'border-slate-100'}`}>
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                                {item.product.image_url && <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="font-bold text-slate-900 text-xs truncate uppercase">{item.product.name}</h4>
                                                    {isItemEligible(item) && (
                                                        <span className="shrink-0 text-[9px] font-black uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Promo</span>
                                                    )}
                                                </div>
                                                <p className="text-slate-400 font-bold text-[10px]">${item.product.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1">
                                                <button onClick={() => onUpdateQuantity(item.product.id, -1, item.delivery_day)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-white shadow-sm text-slate-400">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.product.id, 1, item.delivery_day)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                    {items.length > 0 && (
                        <div className="space-y-4 pt-4 border-t border-slate-50">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tus Datos</h3>
                            <div className="space-y-2">
                                <input type="text" placeholder="Tu Nombre (Obligatorio) *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={`w-full px-4 py-3 bg-slate-50 border ${!customerName.trim() && isSubmitting ? 'border-red-500' : 'border-0'} rounded-xl text-sm font-bold text-slate-700 outline-none`} />
                                <input type="tel" placeholder="Tu WhatsApp (Obligatorio) *" value={customerWhatsapp} onChange={(e) => setCustomerWhatsapp(e.target.value)} className={`w-full px-4 py-3 bg-slate-50 border ${!customerWhatsapp.trim() && isSubmitting ? 'border-red-500' : 'border-0'} rounded-xl text-sm font-bold text-slate-700 outline-none`} />
                                <input type="text" placeholder="Empresa (Opcional)" value={customerCompany} onChange={(e) => setCustomerCompany(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm font-bold text-slate-700 outline-none" />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Entrega y Pago</h3>
                            <div className="space-y-2">
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm font-bold text-slate-700 outline-none">
                                    {(enabledMethods.cash || !enabledMethods) && <option value="Efectivo">Efectivo / Acordar</option>}
                                    {enabledMethods.transfer && <option value="Transferencia">Transferencia Bancaria</option>}
                                    {enabledMethods.yape && <option value="Yape">Yape</option>}
                                    {enabledMethods.plin && <option value="Plin">Plin</option>}
                                    <option value="Mercado Pago">Mercado Pago</option>
                                </select>

                                {paymentMethod === "Transferencia" && metadata.transfer_details && (
                                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">CBU / Alias para transferencia:</p>
                                        <p className="text-xs font-medium text-slate-700 whitespace-pre-wrap">{metadata.transfer_details}</p>
                                    </div>
                                )}

                                {paymentMethod === "Yape" && metadata.yape_details && (
                                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Datos para Yape:</p>
                                        <p className="text-xs font-medium text-slate-700 whitespace-pre-wrap">{metadata.yape_details}</p>
                                    </div>
                                )}

                                {paymentMethod === "Plin" && metadata.plin_details && (
                                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Datos para Plin:</p>
                                        <p className="text-xs font-medium text-slate-700 whitespace-pre-wrap">{metadata.plin_details}</p>
                                    </div>
                                )}
                                <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value as any)} className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm font-bold text-slate-700 outline-none">
                                    <option value="envio">Envío a domicilio</option>
                                    <option value="retiro">Retiro en local</option>
                                </select>
                                {deliveryType === "envio" && (
                                    <>
                                        <input type="text" placeholder="Dirección (Obligatorio) *" value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full px-4 py-3 bg-slate-50 border ${!address.trim() && isSubmitting ? 'border-red-500' : 'border-0'} rounded-xl text-sm font-bold text-slate-700 outline-none`} />
                                        <select value={deliveryZone} onChange={(e) => setDeliveryZone(e.target.value)} className={`w-full px-4 py-3 bg-slate-50 border ${!deliveryZone && isSubmitting ? 'border-red-500' : 'border-0'} rounded-xl text-sm font-bold text-slate-700 outline-none`}>
                                            <option value="">Zona de Entrega (Obligatorio) *</option>
                                            <option value="CABA">CABA</option>
                                            <option value="Zona Norte">Zona Norte</option>
                                            <option value="Zona Sur">Zona Sur</option>
                                            <option value="Zona Oeste">Zona Oeste</option>
                                        </select>
                                    </>
                                )}
                                <textarea placeholder="¿Alguna observación?" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm font-bold text-slate-700 outline-none resize-none" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-100 space-y-4 bg-slate-50/50">
                    {couponsEnabled && items.length > 0 && (
                        <div className="space-y-2">
                            {!appliedCoupon ? (
                                <div className="flex gap-2">
                                    <input type="text" placeholder="CUPÓN" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase outline-none focus:border-slate-900 transition-all" />
                                    <button onClick={handleApplyCoupon} disabled={isValidating || !couponCode.trim()} className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50 transition-all hover:bg-slate-800">{isValidating ? '...' : 'Aplicar'}</button>
                                </div>
                            ) : (
                                <div className={`flex items-center justify-between p-2.5 rounded-xl ${noEligibleProducts ? 'bg-amber-500' : 'bg-slate-900'} text-white`}>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{appliedCoupon.code} APLICADO</span>
                                        {discount > 0 && (
                                            <span className="ml-2 text-[10px] font-bold text-emerald-300">-${discount.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <button onClick={() => setAppliedCoupon(null)} className="text-[10px] font-black uppercase">X</button>
                                </div>
                            )}
                            {noEligibleProducts && (
                                <p className="text-[10px] text-amber-600 font-bold bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                    ⚠ Ningún producto en tu carrito aplica para este cupón
                                </p>
                            )}
                            {couponError && <p className="text-[10px] text-rose-500 font-bold">{couponError}</p>}
                        </div>
                    )}
                    <div className="space-y-1">
                        {(discount > 0 || currentShipping > 0) && (
                            <>
                                <div className="flex justify-between font-bold text-xs text-slate-400"><span>SUBTOTAL</span><span>${totalPrice.toLocaleString()}</span></div>
                                {discount > 0 && (
                                    <div className="flex justify-between font-bold text-xs text-emerald-600"><span>DESCUENTO ({appliedCoupon.code})</span><span>-${discount.toLocaleString()}</span></div>
                                )}
                                {currentShipping > 0 && (
                                    <div className="flex justify-between font-bold text-xs text-slate-400"><span>ENVÍO</span><span>+${currentShipping.toLocaleString()}</span></div>
                                )}
                            </>
                        )}
                        <div className="flex justify-between font-bold text-xs text-slate-500"><span>TOTAL</span><span className="text-lg text-slate-900">${finalTotal.toLocaleString()}</span></div>
                    </div>
                    <button disabled={items.length === 0 || isSubmitting} onClick={handleSendWhatsApp} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-slate-200">{isSubmitting ? 'Procesando...' : 'Pedir por WhatsApp'}</button>
                </div>
            </div>
        </div>
    );
}
