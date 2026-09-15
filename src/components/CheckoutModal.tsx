import React, { useState } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Bike,
  Store,
  Utensils,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderFormData, OrderTicket, OrderType, PaymentMethod } from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

interface CheckoutModalProps {
  onOpenKitchen: () => void;
  restaurantName?: string;
  whatsappNumber?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onOpenKitchen,
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotalUSD,
    deliveryFeeUSD,
    totalUSD,
    selectedOrderType,
    setSelectedOrderType,
    submitOrder,
  } = useCart();

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    orderType: selectedOrderType,
    deliveryAddress: '',
    tableNumber: '',
    paymentMethod: 'yappy_transferencia',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedTicket, setCompletedTicket] = useState<OrderTicket | null>(null);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'Por favor ingresa tu nombre completo';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Por favor ingresa un número de teléfono o WhatsApp';
    }
    if (formData.orderType === 'delivery' && !formData.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Ingresa la dirección detallada de entrega';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderTypeChange = (type: OrderType) => {
    setSelectedOrderType(type);
    setFormData((prev) => ({ ...prev, orderType: type }));
  };

  // Submit and launch WhatsApp
  const handleSendViaWhatsApp = () => {
    if (!validate()) return;

    // Save ticket in local order management
    const ticket = submitOrder(formData);
    setCompletedTicket(ticket);

    // Build URL and open WhatsApp
    const waUrl = getWhatsAppOrderUrl(
      items,
      formData,
      subtotalUSD,
      deliveryFeeUSD,
      totalUSD,
      ticket.orderNumber,
      whatsappNumber,
      restaurantName
    );

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Submit directly to Kitchen/POS without WhatsApp redirect
  const handleSendDirectToKitchen = () => {
    if (!validate()) return;
    const ticket = submitOrder(formData);
    setCompletedTicket(ticket);
  };

  const handleClose = () => {
    setCompletedTicket(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#141520] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#181926] border-b border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Paso Final
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              {completedTicket ? '¡Pedido Confirmado!' : 'Datos del Pedido'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-xl"
            aria-label="Cerrar modal de pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {completedTicket ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white">
                  ¡Tu orden ha sido registrada con éxito!
                </h4>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Ticket de orden:{' '}
                  <span className="text-amber-400 font-mono font-bold text-base">
                    {completedTicket.orderNumber}
                  </span>
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-[#0e0f15] border border-zinc-800 rounded-2xl p-5 text-left text-xs text-zinc-300 space-y-3 font-mono">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="font-bold text-white uppercase">{restaurantName}</span>
                  <span className="text-amber-400 font-bold">{completedTicket.orderNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Cliente:</span>
                  <span className="font-semibold text-white">
                    {completedTicket.formData.customerName} ({completedTicket.formData.phone})
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Modalidad:</span>
                  <span className="font-semibold text-white uppercase">
                    {completedTicket.formData.orderType}
                  </span>
                </div>
                {completedTicket.formData.deliveryAddress && (
                  <div>
                    <span className="text-zinc-500 block">Dirección:</span>
                    <span className="text-white">
                      {completedTicket.formData.deliveryAddress}
                    </span>
                  </div>
                )}
                <div className="border-t border-zinc-800 pt-2 space-y-1">
                  {completedTicket.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>USD {(item.unitPriceUSD * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-sm text-amber-400">
                  <span>TOTAL PAGADO/A COBRAR:</span>
                  <span>USD {completedTicket.totalUSD.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons for Finished Order */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    onOpenKitchen();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-500/40 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Ver en Panel de Cocina (KDS)</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-lg shadow-orange-500/25"
                >
                  <span>Aceptar y Volver al Menú</span>
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendViaWhatsApp();
              }}
              className="space-y-6"
            >
              {/* Order Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  1. Tipo de pedido *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOrderTypeChange('delivery')}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all text-xs ${
                      formData.orderType === 'delivery'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Bike className="w-5 h-5 text-orange-400" />
                    <span>Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderTypeChange('pickup')}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all text-xs ${
                      formData.orderType === 'pickup'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Store className="w-5 h-5 text-orange-400" />
                    <span>Para recoger</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderTypeChange('dine_in')}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all text-xs ${
                      formData.orderType === 'dine_in'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Utensils className="w-5 h-5 text-orange-400" />
                    <span>Consumo en local</span>
                  </button>
                </div>
              </div>

              {/* Personal Data Inputs */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  2. Datos de contacto *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      id="checkout-name-input"
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      placeholder="Nombre y Apellido *"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                    />
                    {formErrors.customerName && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      id="checkout-phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Teléfono / Celular *"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                    />
                    {formErrors.phone && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Conditional Delivery Address Input */}
                {formData.orderType === 'delivery' && (
                  <div className="space-y-1">
                    <textarea
                      id="checkout-address-input"
                      rows={2}
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, deliveryAddress: e.target.value })
                      }
                      placeholder="Dirección exacta de entrega (Calle, Edificio/Casa, Apto, Punto de referencia) *"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 resize-none"
                    />
                    {formErrors.deliveryAddress && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.deliveryAddress}
                      </p>
                    )}
                  </div>
                )}

                {/* Dine-in Table Number */}
                {formData.orderType === 'dine_in' && (
                  <div>
                    <input
                      id="checkout-table-input"
                      type="text"
                      value={formData.tableNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, tableNumber: e.target.value })
                      }
                      placeholder="Número de mesa (Ej. Mesa 4 o 'En barra')"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  3. Método de pago *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: 'yappy_transferencia' })
                    }
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs text-left transition-all ${
                      formData.paymentMethod === 'yappy_transferencia'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>Yappy / Transferencia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'tarjeta' })}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs text-left transition-all ${
                      formData.paymentMethod === 'tarjeta'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>Tarjeta (POS al recibir)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'efectivo' })}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs text-left transition-all ${
                      formData.paymentMethod === 'efectivo'
                        ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-amber-400" />
                    <span>Efectivo contraentrega</span>
                  </button>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  4. Notas adicionales para el pedido (Opcional)
                </label>
                <input
                  id="checkout-notes-input"
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ej. Pagaré con billete de $50, dejar con seguridad..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Complete Summary Box */}
              <div className="bg-[#0e0f15] border border-zinc-800 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white border-b border-zinc-800 pb-2">
                  <span>Resumen del Pedido</span>
                  <span>{items.length} ítems</span>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-xs text-zinc-300"
                    >
                      <span className="truncate pr-2">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold text-white whitespace-nowrap">
                        USD {(item.unitPriceUSD * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-800 pt-2 space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span>USD {subtotalUSD.toFixed(2)}</span>
                  </div>
                  {formData.orderType === 'delivery' && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Costo de envío:</span>
                      <span>USD {deliveryFeeUSD.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-amber-400 pt-1 border-t border-zinc-800">
                    <span>TOTAL A PAGAR:</span>
                    <span>USD {totalUSD.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp and Direct Submit */}
              <div className="space-y-3 pt-2">
                <button
                  id="checkout-submit-whatsapp-btn"
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-black py-4 px-6 rounded-2xl shadow-xl shadow-[#25D366]/20 active:scale-95 transition-all text-base"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Enviar Pedido Completo por WhatsApp</span>
                </button>

                <button
                  id="checkout-submit-direct-btn"
                  type="button"
                  onClick={handleSendDirectToKitchen}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm border border-zinc-700 transition-all"
                >
                  <Send className="w-4 h-4 text-orange-400" />
                  <span>Confirmar sin WhatsApp (Solo registrar en Cocina)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
