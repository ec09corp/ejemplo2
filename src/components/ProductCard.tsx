import React from 'react';
import { Plus, Flame, Clock, Sparkles } from 'lucide-react';
import { Product } from '../types/restaurant';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelectForCustomization: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectForCustomization,
}) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If product has required customizations, open modal instead of raw quick-add
    if (product.customizationGroups && product.customizationGroups.length > 0) {
      onSelectForCustomization(product);
    } else {
      addToCart(product, 1, []);
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Más Vendido':
        return 'bg-amber-500 text-black border-amber-400';
      case 'Picante':
        return 'bg-red-600 text-white border-red-500';
      case 'Especial Chef':
        return 'bg-purple-600 text-white border-purple-400';
      case 'Combo Estrella':
        return 'bg-emerald-600 text-white border-emerald-400';
      case 'Nuevo':
        return 'bg-blue-600 text-white border-blue-400';
      default:
        return 'bg-orange-500 text-white border-orange-400';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectForCustomization(product)}
      className="group relative flex flex-col bg-[#14151e] rounded-3xl border border-zinc-800/80 hover:border-orange-500/50 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Dark gradient edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151e] via-transparent to-transparent opacity-80" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-md flex items-center gap-1 ${getBadgeColor(
                product.badge
              )}`}
            >
              {product.badge === 'Picante' && <Flame className="w-3 h-3 fill-current" />}
              {product.badge === 'Especial Chef' && <Sparkles className="w-3 h-3 fill-current" />}
              {product.badge}
            </span>
          </div>
        )}

        {/* Prep Time pill */}
        {product.prepTimeMinutes && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-zinc-300 text-[11px] font-medium px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-400" />
            <span>{product.prepTimeMinutes}m</span>
          </div>
        )}

        {/* Spicy Indicator Dots */}
        {product.spicyLevel && product.spicyLevel > 0 && (
          <div className="absolute bottom-2 left-3 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {Array.from({ length: product.spicyLevel }).map((_, idx) => (
              <Flame key={idx} className="w-3 h-3 text-red-500 fill-red-500" />
            ))}
            <span className="text-[10px] font-bold text-red-400 ml-1">Picante</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
              Precio
            </span>
            <span className="text-base sm:text-lg font-black text-amber-400 tracking-tight">
              USD {product.priceUSD.toFixed(2)}
            </span>
          </div>

          <button
            id={`btn-add-${product.id}`}
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            title="Agregar al pedido"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
