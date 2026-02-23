import { useState } from "react";
import { X, Plus, Minus, Send, Trash2, Tag, AlertCircle } from "lucide-react";
import { type CartItem } from "../../types";
import { validateCoupon } from "../../api/catalog";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    totalPrice: number;
    onUpdateQuantity: (id: string | number, delta: number) => void;
    onClear: () => void;
    whatsappNumber: string;
    storeId: string;
    couponsEnabled?: boolean;
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
    couponsEnabled = true
}: CartDrawerProps) {
    const [deliveryType, setDeliveryType] = useState<"envio" | "retiro">("envio");
    const [address, setAddress] = useState("");
    const [deliveryZone, setDeliveryZone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Efectivo");
    const [notes, setNotes] = useState("");

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [couponError, setCouponError] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    if (!isOpen) return null;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsValidating(true);
        setCouponError("");
        try {
            const coupon = await validateCoupon(couponCode, storeId);

            // Validar monto mínimo
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
            case 1: // % All
                discount = totalPrice * (value / 100);
                break;
            case 2: // $ All
                discount = value;
                break;
            case 3: // % Selected
                const items3 = items.filter(i => (applicable_products || []).includes(i.product.id));
                discount = items3.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) * (value / 100);
                break;
            case 4: // $ Selected
                const items4 = items.filter(i => (applicable_products || []).includes(i.product.id));
                if (items4.length > 0) discount = value;
                break;
            case 5: // % Category
                const items5 = items.filter(i => (applicable_categories || []).includes(i.product.category_id));
                discount = items5.reduce((acc, i) => acc + (i.product.price * i.quantity), 0) * (value / 100);
                break;
            case 6: // $ Category
                const items6 = items.filter(i => (applicable_categories || []).includes(i.product.category_id));
                if (items6.length > 0) discount = value;
                break;
        }

        return Math.min(discount, totalPrice);
    };

    const discount = calculateDiscount();
    const finalTotal = totalPrice - discount;

    const handleSendWhatsApp = () => {
        let message = `*NUEVO PEDIDO*\n` +
            `------------------\n` +
            items.map(i => `- ${i.quantity}x ${i.product.name} — $${(i.product.price * i.quantity).toLocaleString()}`).join('\n');

        if (appliedCoupon) {
            message += `\n\nSubtotal: $${totalPrice.toLocaleString()}\n` +
                `Cupón: ${appliedCoupon.code} (-$${discount.toLocaleString()})\n`;
        }

        message += `\n*TOTAL: $${finalTotal.toLocaleString()}*\n` +
            `------------------\n\n` +
            `*DETALLES DE ENTREGA*\n` +
            `- Tipo: ${deliveryType === 'envio' ? 'Envío a domicilio' : 'Retiro en local'}\n`;

        if (deliveryType === 'envio') {
            message += `- Dirección: ${address}\n`;
            if (deliveryZone) message += `- Zona: ${deliveryZone}\n`;
        }

        message += `- Pago: ${paymentMethod}\n`;
        if (notes) message += `\n*OBSERVACIONES:*\n${notes}`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">Tu Pedido</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 items-start pb-4 border-b border-slate-50">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                            {item.product.image_url && <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-slate-900 text-sm truncate">{item.product.name}</h4>
                                            <p className="text-primary-dynamic font-bold text-sm">${(item.product.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-600"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Formulario de Checkout */}
                            <div className="space-y-4 pt-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Datos de Entrega</h3>

                                <div className="space-y-3">
                                    {/* Método de Pago */}
                                    <div className="flex items-stretch border-l-4 border-primary-dynamic bg-slate-50 rounded-r-xl overflow-hidden shadow-sm">
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full px-4 py-3 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                                        >
                                            <option value="Efectivo">Efectivo</option>
                                            <option value="Transferencia">Transferencia</option>
                                            <option value="Mercado Pago">Mercado Pago</option>
                                        </select>
                                    </div>

                                    {/* Tipo de Envío */}
                                    <div className="flex items-stretch border-l-4 border-slate-900 bg-slate-50 rounded-r-xl overflow-hidden shadow-sm">
                                        <select
                                            value={deliveryType}
                                            onChange={(e) => setDeliveryType(e.target.value as any)}
                                            className="w-full px-4 py-3 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                                        >
                                            <option value="envio">Quiero que me lo envíen</option>
                                            <option value="retiro">Retiro en el local</option>
                                        </select>
                                    </div>

                                    {deliveryType === "envio" && (
                                        <>
                                            <div className="flex items-stretch border-l-4 border-slate-900 bg-slate-50 rounded-r-xl overflow-hidden shadow-sm">
                                                <input
                                                    type="text"
                                                    placeholder="Dirección (Calle y Número)"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="w-full px-4 py-3 bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1 flex items-stretch border-l-4 border-slate-900 bg-slate-50 rounded-r-xl overflow-hidden shadow-sm">
                                                    <select
                                                        value={deliveryZone}
                                                        onChange={(e) => setDeliveryZone(e.target.value)}
                                                        className="w-full px-4 py-3 bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                                                    >
                                                        <option value="">Zona de Entrega</option>
                                                        <option value="CABA">CABA</option>
                                                        <option value="Zona Norte">Zona Norte</option>
                                                        <option value="Zona Sur">Zona Sur</option>
                                                        <option value="Zona Oeste">Zona Oeste</option>
                                                    </select>
                                                </div>
                                                <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-tight shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                                                    Ver Zonas
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {/* Observaciones */}
                                    <div className="flex items-stretch border-l-4 border-slate-400 bg-slate-50 rounded-r-xl overflow-hidden shadow-sm">
                                        <textarea
                                            placeholder="¿Alguna Observación?"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 space-y-4 bg-slate-50/50">
                    {/* Sección de Cupones */}
                    {couponsEnabled && items.length > 0 && (
                        <div className="space-y-3">
                            {appliedCoupon ? (
                                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl animate-in fade-in zoom-in duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary-dynamic rounded-lg flex items-center justify-center">
                                            <Tag className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-primary-dynamic uppercase tracking-widest">Cupón Aplicado</span>
                                            <span className="text-sm font-black text-slate-800 uppercase">{appliedCoupon.code}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAppliedCoupon(null)}
                                        className="text-[10px] font-black text-primary-dynamic uppercase hover:underline"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="¿Tenés un cupón?"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold uppercase outline-none focus:border-primary-dynamic transition-all"
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={isValidating || !couponCode.trim()}
                                            className="bg-slate-900 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50 transition-all hover:bg-slate-800"
                                        >
                                            {isValidating ? '...' : 'Aplicar'}
                                        </button>
                                    </div>
                                    {couponError && (
                                        <div className="flex items-center gap-1.5 text-rose-500">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold">{couponError}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between font-bold text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>${totalPrice.toLocaleString()}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex items-center justify-between font-bold text-sm text-primary-dynamic">
                                <span>Descuento</span>
                                <span>-${discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between font-bold text-xl pt-2 border-t border-slate-200">
                            <span className="text-slate-900 uppercase tracking-tight">Total</span>
                            <span className="text-primary-dynamic">${finalTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        disabled={items.length === 0}
                        onClick={handleSendWhatsApp}
                        className="w-full bg-primary-dynamic hover:opacity-90 disabled:bg-slate-300 text-white font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary-dynamic/20"
                    >
                        <Send className="w-5 h-5" />
                        Pedir por WhatsApp
                    </button>

                    {items.length > 0 && (
                        <button
                            onClick={onClear}
                            className="w-full text-slate-400 hover:text-red-500 text-sm font-medium transition-colors"
                        >
                            Vaciar carrito
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
