import React, { useState } from 'react';
import { X, Plus, Minus, Check, Clock, Flame, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, CartItem } from '../types/restaurant';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

interface SelectedOptionData {
  groupId?: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  priceUSD: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectedOptionData>>({});

  if (!product) return null;

  // Initialize defaults for required groups
  const handleOptionSelect = (
    groupId: string,
    groupTitle: string,
    optionId: string,
    optionName: string,
    priceUSD: number
  ) => {
    setSelectedOptions((prev) => {
      // If single selection in this group
      return {
        ...prev,
        [groupId]: { groupId, optionId, optionName, priceUSD, groupTitle },
      };
    });
  };

  const optionsValues: SelectedOptionData[] = Object.values(selectedOptions);
  const optionsExtraTotal = optionsValues.reduce(
    (sum: number, opt: SelectedOptionData) => sum + opt.priceUSD,
    0
  );

  const unitTotal = product.priceUSD + optionsExtraTotal;
  const grandTotal = unitTotal * quantity;

  const handleConfirmAddToCart = () => {
    // Check if required groups are picked
    if (product.customizationGroups) {
      for (const group of product.customizationGroups) {
        if (group.required && !selectedOptions[group.id]) {
          // Auto select first option if not selected
          const firstOpt = group.options[0];
          if (firstOpt) {
            selectedOptions[group.id] = {
              groupId: group.id,
              groupTitle: group.title,
              optionId: firstOpt.id,
              optionName: firstOpt.name,
              priceUSD: firstOpt.priceUSD,
            };
          }
        }
      }
    }

    const optionsList: CartItem['selectedOptions'] = (Object.entries(selectedOptions) as [string, SelectedOptionData][]).map(
      ([groupId, item]) => ({
        groupId,
        groupTitle: item.groupTitle,
        optionId: item.optionId,
        optionName: item.optionName,
        priceUSD: item.priceUSD,
      })
    );

    addToCart(product, quantity, optionsList, notes.trim());
    onClose();
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#14151e] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/20 transition-all"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="relative h-60 sm:h-72 w-full bg-zinc-900 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14151e] via-black/30 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {product.badge && (
                <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
              {product.prepTimeMinutes && (
                <span className="bg-black/75 text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  {product.prepTimeMinutes} min preparación
                </span>
              )}
            </div>
          </div>

          {/* Body Information */}
          <div className="p-5 sm:p-6 space-y-6">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  {product.name}
                </h2>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-black text-amber-400">
                    USD {product.priceUSD.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Customization Groups */}
            {product.customizationGroups && product.customizationGroups.length > 0 && (
              <div className="space-y-5 pt-2 border-t border-zinc-800">
                {product.customizationGroups.map((group) => {
                  const currentSelected = selectedOptions[group.id]?.optionId;

                  return (
                    <div key={group.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                          <span>{group.title}</span>
                        </h4>
                        <span className="text-[11px] font-semibold text-zinc-400 uppercase bg-zinc-800 px-2 py-0.5 rounded">
                          {group.required ? 'Obligatorio' : 'Opcional'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.options.map((opt) => {
                          const isSelected = currentSelected === opt.id;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                handleOptionSelect(
                                  group.id,
                                  group.title,
                                  opt.id,
                                  opt.name,
                                  opt.priceUSD
                                )
                              }
                              className={`flex items-center justify-between p-3 rounded-2xl border text-left text-xs transition-all ${
                                isSelected
                                  ? 'bg-orange-500/15 border-orange-500 text-white font-bold ring-1 ring-orange-500/40'
                                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                    isSelected
                                      ? 'border-orange-400 bg-orange-500 text-white'
                                      : 'border-zinc-600'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className="line-clamp-1">{opt.name}</span>
                              </div>
                              {opt.priceUSD > 0 && (
                                <span className="text-amber-400 font-semibold ml-1 whitespace-nowrap">
                                  +USD {opt.priceUSD.toFixed(2)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label htmlFor="product-notes-input" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Instrucciones especiales para cocina (Opcional)
              </label>
              <textarea
                id="product-notes-input"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Sin cebolla, salsa aparte, bien tostado..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer: Quantity & Confirm Add */}
        <div className="p-4 sm:p-5 bg-[#0e0f15] border-t border-zinc-800 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-1 shadow-inner">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white active:scale-95 transition-all"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black text-base text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white active:scale-95 transition-all"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button with Total in USD */}
          <button
            id="modal-add-to-cart-btn"
            onClick={handleConfirmAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm sm:text-base py-3.5 px-5 rounded-2xl shadow-xl shadow-orange-500/25 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Agregar al pedido</span>
            <span className="bg-black/30 px-2 py-0.5 rounded-lg border border-white/20 text-xs sm:text-sm font-bold ml-1">
              USD {grandTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
