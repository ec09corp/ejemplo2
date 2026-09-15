import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../config/restaurantConfig';
import { GalleryItem } from '../types/restaurant';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'platos' | 'ambiente' | 'cocina'>('todos');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'todos') return true;
    return item.category === selectedFilter;
  });

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="galeria" className="py-16 sm:py-24 bg-[#0c0d12] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Experiencia Visual</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Nuestra Galería
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Un vistazo a nuestras brasas vivas, los platillos más codiciados y el ambiente
              vibrante de nuestro restaurante. Haz clic para ampliar.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#14151e] p-1.5 rounded-2xl border border-zinc-800 self-start sm:self-auto overflow-x-auto">
            {(
              [
                { id: 'todos', label: 'Todo' },
                { id: 'platos', label: 'Platillos' },
                { id: 'ambiente', label: 'Ambiente' },
                { id: 'cocina', label: 'Brasas' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Eye Icon */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-orange-400" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 z-20 p-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full border border-white/20 transition-all"
            aria-label="Cerrar vista ampliada"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full border border-white/20 transition-all"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full border border-white/20 transition-all"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl max-h-[70vh] w-auto">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-center space-y-1 text-white max-w-xl">
              <h3 className="text-xl font-bold font-heading text-amber-400">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-sm text-zinc-300">
                {filteredItems[activeImageIndex].description}
              </p>
              <span className="text-xs text-zinc-500">
                {activeImageIndex + 1} de {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
