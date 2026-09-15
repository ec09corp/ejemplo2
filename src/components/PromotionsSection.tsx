import React from 'react';
import { Tag, Sparkles, ShoppingBag, Check, ArrowRight, Clock } from 'lucide-react';
import { PROMOTIONS, PRODUCTS } from '../config/restaurantConfig';
import { useCart } from '../context/CartContext';
import { Product } from '../types/restaurant';

export const PromotionsSection: React.FC = () => {
  const { addToCart } = useCart();

  const handleClaimPromo = (promoId: string) => {
    const promo = PROMOTIONS.find((p) => p.id === promoId);
    if (!promo) return;

    // Find reference product or create promotion product representation
    const refProduct = PRODUCTS.find((p) => p.id === promo.productIdReference);

    const promoProduct: Product = {
      id: `promo-item-${promo.id}`,
      name: promo.title,
      description: promo.description,
      priceUSD: promo.promoPriceUSD,
      categoryId: 'promociones',
      image: promo.image,
      badge: 'Combo Estrella',
      isAvailable: true,
    };

    addToCart(refProduct ? { ...refProduct, priceUSD: promo.promoPriceUSD, name: promo.title } : promoProduct, 1, [], 'Promoción especial aplicada');
  };

  return (
    <section
      id="promociones"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#0c0d12] via-[#101119] to-[#0c0d12] relative border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ofertas Por Tiempo Limitado</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Promociones Exclusivas
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Disfruta los combos más populares y especiales a las brasas con descuentos de hasta el
              40% en tu pedido.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-zinc-400 bg-[#14151e] border border-zinc-800 px-4 py-2 rounded-2xl">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Precios especiales en USD actualizados a diario</span>
          </div>
        </div>

        {/* Promotions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo) => {
            const savingsUSD = promo.originalPriceUSD - promo.promoPriceUSD;
            const savingsPercent = Math.round(
              (savingsUSD / promo.originalPriceUSD) * 100
            );

            return (
              <div
                key={promo.id}
                id={`promo-card-${promo.id}`}
                className="group relative flex flex-col bg-[#14151e] rounded-3xl border border-zinc-800 hover:border-amber-500/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151e] via-black/30 to-transparent" />

                  {/* Savings Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{promo.badge} ({savingsPercent}% OFF)</span>
                    </span>
                  </div>

                  {/* Expiration Tag */}
                  {promo.expiresTag && (
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-amber-500/30">
                        <Clock className="w-3 h-3" />
                        <span>{promo.expiresTag}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {promo.description}
                    </p>

                    {/* Includes Checklist */}
                    {promo.includes && promo.includes.length > 0 && (
                      <div className="pt-3 space-y-1.5 border-t border-zinc-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Incluye:
                        </span>
                        {promo.includes.map((inc, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 line-through">
                        USD {promo.originalPriceUSD.toFixed(2)}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-amber-400 tracking-tight">
                          USD {promo.promoPriceUSD.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`btn-promo-${promo.id}`}
                      onClick={() => handleClaimPromo(promo.id)}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-black text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Pedir Promo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
