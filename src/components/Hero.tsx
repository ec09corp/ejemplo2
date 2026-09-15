import React from 'react';
import {
  Flame,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Star,
  Clock,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Logo } from './Logo';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getWhatsAppDirectChatUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

interface HeroProps {
  restaurantName?: string;
  whatsappNumber?: string;
}

export const Hero: React.FC<HeroProps> = ({
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const { setIsCartOpen } = useCart();
  const directWhatsAppUrl = getWhatsAppDirectChatUrl(whatsappNumber, restaurantName);

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#0c0d12] via-[#11121a] to-[#0c0d12] pt-8 pb-16 lg:py-20 border-b border-zinc-800/80"
    >
      {/* Background Decorative Ambient Radial Gradients */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-inner">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-500" />
              <span>Sabor auténtico a las brasas • 100% Angus Certificado</span>
            </div>

            {/* Restaurant Title & Logo representation */}
            <div className="space-y-2">
              <div className="mb-2">
                <Logo name={restaurantName} size="xl" showTagline={false} />
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-heading text-white tracking-tight leading-[1.1]">
                Pasión Por El Fuego,{' '}
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Obsesión Por El Sabor
                </span>
              </h1>
            </div>

            {/* Slogan / Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              {RESTAURANT_CONFIG.subtitle} Burgers con costra crujiente, alitas ahumadas con leña
              de roble y costillitas tiernas bañadas en salsas artesanales únicas.
            </p>

            {/* Core Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Button: Ver Menú */}
              <a
                id="hero-ver-menu-btn"
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base px-7 py-3.5 rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Explorar Menú</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Button: Hacer Pedido (opens cart or jumps to menu) */}
              <button
                id="hero-hacer-pedido-btn"
                onClick={() => {
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                  setIsCartOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-base px-6 py-3.5 rounded-2xl border border-zinc-700 hover:border-zinc-600 shadow-md transition-all active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>Hacer Pedido</span>
              </button>

              {/* Button: WhatsApp Direct Contact */}
              <a
                id="hero-whatsapp-btn"
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 font-bold text-base px-5 py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust and Key Features Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-800/80 w-full max-w-xl">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>30-45 min delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Higiene y calidad 100%</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Carne Angus fresca</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Visual & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 rounded-3xl blur-md opacity-40 animate-pulse" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-[#15161f] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
                  alt={`Especialidad de ${restaurantName}`}
                  className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay on bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Rating Pill */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="text-white text-xs font-bold">4.9 / 5.0</span>
                  <span className="text-zinc-400 text-[11px]">(1,400+ reseñas)</span>
                </div>

                {/* Featured Badge Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-orange-500/40 p-3.5 rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-orange-400 font-bold block">
                      🔥 Platillo Insignia
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base">
                      La Brasa Smash Doble Angus
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block">Solo</span>
                    <span className="text-amber-400 font-black text-base sm:text-lg">USD 13.50</span>
                  </div>
                </div>
              </div>

              {/* Floating Embers / Flame Pill */}
              <div className="absolute -bottom-5 -right-3 hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black uppercase tracking-wider">
                <Flame className="w-4 h-4 animate-bounce" />
                <span>Ahumado con Roble</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
