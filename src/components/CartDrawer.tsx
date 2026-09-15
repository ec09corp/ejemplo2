import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Bike,
  Store,
  Utensils,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderType } from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalUSD,
    deliveryFeeUSD,
    totalUSD,
    itemCount,
    selectedOrderType,
    setSelectedOrderType,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          id="cart-drawer-container"
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#12131b] border-l border-zinc-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Cart Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-[#151722]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black font-heading text-white">Tu Pedido</h3>
                <p className="text-xs text-zinc-400">
                  {itemCount} {itemCount === 1 ? 'producto' : 'productos'} seleccionados
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  title="Vaciar carrito"
                  className="text-xs text-zinc-400 hover:text-red-400 p-2 hover:bg-zinc-800 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                id="cart-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Order Type Selector */}
            <div className="bg-[#181a26] p-2 rounded-2xl border border-zinc-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 block mb-1.5">
                Modalidad de entrega
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectedOrderType('delivery')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition-all ${
                    selectedOrderType === 'delivery'
                      ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderType('pickup')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition-all ${
                    selectedOrderType === 'pickup'
                      ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Para llevar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderType('dine_in')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl transition-all ${
                    selectedOrderType === 'dine_in'
                      ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>En mesa</span>
                </button>
              </div>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Tu carrito está vacío</h4>
                  <p className="text-xs text-zinc-400 max-w-xs">
                    Explora el menú y agrega deliciosas hamburguesas, alitas o combos a las brasas.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Explorar platillos
                </button>
              </div>
            ) : (
              /* Item Cards */
              items.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="bg-[#181a26] border border-zinc-800/80 rounded-2xl p-3.5 flex gap-3 relative group hover:border-zinc-700 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-zinc-900"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {item.name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Selected Options List */}
                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {item.selectedOptions.map((o) => o.optionName).join(', ')}
                      </p>
                    )}

                    {/* Notes if any */}
                    {item.notes && (
                      <p className="text-[10px] text-amber-400/90 italic line-clamp-1">
                        Nota: &ldquo;{item.notes}&rdquo;
                      </p>
                    )}

                    {/* Quantity & Unit Price Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95"
                          aria-label="Restar 1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95"
                          aria-label="Sumar 1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-black text-amber-400">
                        USD {(item.unitPriceUSD * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#151722] border-t border-zinc-800 space-y-4">
              {/* Financial Calculation in USD */}
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-semibold">USD {subtotalUSD.toFixed(2)}</span>
                </div>
                {selectedOrderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Costo de envío estimado</span>
                    <span className="text-zinc-200 font-semibold">
                      USD {deliveryFeeUSD.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total a Pagar</span>
                  <span className="text-amber-400 text-lg">USD {totalUSD.toFixed(2)}</span>
                </div>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirmación directa por WhatsApp o en mostrador</span>
              </div>

              {/* Continue Button */}
              <button
                id="cart-continue-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 px-4 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all text-sm sm:text-base"
              >
                <span>Continuar al Proceso de Pedido</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
