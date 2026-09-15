import React, { useState, useMemo } from 'react';
import {
  Flame,
  Search,
  Sparkles,
  Gift,
  UtensilsCrossed,
  Beef,
  Beer,
  CakeSlice,
  Tag,
  Filter,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../config/restaurantConfig';
import { CategoryId, Product } from '../types/restaurant';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Gift':
        return <Gift className="w-4 h-4" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'Beef':
        return <Beef className="w-4 h-4" />;
      case 'Beer':
        return <Beer className="w-4 h-4" />;
      case 'CakeSlice':
        return <CakeSlice className="w-4 h-4" />;
      case 'Tag':
        return <Tag className="w-4 h-4" />;
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'todos' || product.categoryId === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#0c0d12] relative">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Menú Digital Interactivo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Nuestra Carta Culinaria
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Ingredientes seleccionados, preparaciones frescas al instante y porciones abundantes.
            Todos nuestros precios están indicados en <strong className="text-amber-400">USD</strong>.
          </p>
        </div>

        {/* Search Bar & Quick Counters */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por hamburguesa, alitas, salsas, postres..."
              className="w-full bg-[#14151e] border border-zinc-800 focus:border-orange-500 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 shadow-inner focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 px-2 py-0.5 rounded"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider / Bar */}
        <div className="relative mb-10">
          <div
            id="category-pills-list"
            className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth"
          >
            {/* 'Todos' Pill */}
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
                selectedCategory === 'todos'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-400 text-white shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-[#14151e] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Todo el Menú</span>
              <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {PRODUCTS.length}
              </span>
            </button>

            {/* Configured Categories */}
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-400 text-white shadow-lg shadow-orange-500/25 scale-105'
                      : 'bg-[#14151e] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span className={isSelected ? 'text-white' : 'text-orange-400'}>
                    {getCategoryIcon(cat.iconName)}
                  </span>
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            id="products-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectForCustomization={(p) => setActiveProductForModal(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#14151e] border border-zinc-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-zinc-800/80 rounded-full flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No encontramos productos</h3>
            <p className="text-sm text-zinc-400">
              No hay platillos que coincidan con &quot;{searchQuery}&quot;. Intenta con otra búsqueda
              o explora todas las categorías.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

      {/* Product Customization Modal */}
      <ProductDetailModal
        product={activeProductForModal}
        onClose={() => setActiveProductForModal(null)}
      />
    </section>
  );
};
