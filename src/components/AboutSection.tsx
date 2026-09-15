import React from 'react';
import { Flame, Sparkles, Utensils, Truck, Heart, ShieldCheck } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

interface AboutSectionProps {
  restaurantName?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  restaurantName = RESTAURANT_CONFIG.name,
}) => {
  const { brandStory } = RESTAURANT_CONFIG;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-red-400" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-emerald-400" />;
      default:
        return <Heart className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section
      id="nosotros"
      className="py-16 sm:py-24 bg-[#0a0b10] relative overflow-hidden border-t border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage with Stats */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-600/30 via-red-600/20 to-amber-600/20 rounded-3xl blur-xl" />

              {/* Main Photo */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl bg-zinc-900">
                <img
                  src={brandStory.image}
                  alt={`Historia culinaria de ${restaurantName}`}
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-black/80 backdrop-blur-md border border-orange-500/30 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-black text-xl flex-shrink-0">
                    100%
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm">Carne Angus Certificada</h5>
                    <p className="text-xs text-zinc-400">
                      Molienda fresca diaria sin preservantes ni rellenos artificiales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Sobre {restaurantName}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                {brandStory.headline}
              </h2>
            </div>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {/* Historia */}
              <div className="p-4 rounded-2xl bg-[#14151f] border border-zinc-800/80">
                <span className="text-xs font-black uppercase text-amber-400 block mb-1">
                  Nuestra Historia
                </span>
                <p>{brandStory.history}</p>
              </div>

              {/* Filosofía */}
              <div className="p-4 rounded-2xl bg-[#14151f] border border-zinc-800/80">
                <span className="text-xs font-black uppercase text-orange-400 block mb-1">
                  Nuestra Filosofía
                </span>
                <p>{brandStory.philosophy}</p>
              </div>

              {/* Propuesta Gastronómica */}
              <div className="p-4 rounded-2xl bg-[#14151f] border border-zinc-800/80">
                <span className="text-xs font-black uppercase text-red-400 block mb-1">
                  Propuesta Gastronómica
                </span>
                <p>{brandStory.culinaryPromise}</p>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {brandStory.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#161723] border border-zinc-800"
                >
                  <div className="p-2 rounded-xl bg-zinc-800/80 flex-shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
