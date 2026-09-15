import React from 'react';
import { MessageCircle, ShoppingBag, Flame, MapPin, ChefHat, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getWhatsAppDirectChatUrl } from '../utils/whatsapp';

interface FloatingActionsProps {
  onOpenKitchen: () => void;
  restaurantName?: string;
  whatsappNumber?: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenKitchen,
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const { itemCount, subtotalUSD, setIsCartOpen } = useCart();
  const directWhatsAppUrl = getWhatsAppDirectChatUrl(whatsappNumber, restaurantName);

  return (
    <>
      {/* FLOATING DESKTOP/TABLET SIDE BUTTONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating WhatsApp Bubble */}
        <a
          id="floating-whatsapp-btn"
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir WhatsApp oficial"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-[#25D366]/40"
        >
          <MessageCircle className="w-7 h-7 fill-current text-white" />
          <span className="absolute right-16 bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-zinc-700 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ¿Dudas? Chatea con nosotros
          </span>
        </a>

        {/* Floating Cart Button (shows if items in cart or on scroll) */}
        {itemCount > 0 && (
          <button
            id="floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-black px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-orange-500/30 border-2 border-orange-400"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {itemCount}
              </span>
            </div>
            <span className="text-xs tracking-wider uppercase font-bold">Ver Pedido</span>
            <span className="bg-black/30 px-2 py-0.5 rounded-lg text-xs font-mono">
              USD {subtotalUSD.toFixed(2)}
            </span>
          </button>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Sticky on small screens for ultra-smooth app-like feel) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0f15]/95 backdrop-blur-lg border-t border-zinc-800/90 px-3 py-2 flex items-center justify-around shadow-2xl">
        {/* Menu link */}
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400 hover:text-orange-400 active:text-orange-500"
        >
          <Flame className="w-5 h-5 text-orange-400" />
          <span>Menú</span>
        </a>

        {/* Promos */}
        <a
          href="#promociones"
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400 hover:text-amber-400 active:text-amber-500"
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Promos</span>
        </a>

        {/* Center Main Action: Floating Cart Pill */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative -top-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-full shadow-lg shadow-orange-500/40 border-2 border-[#0e0f15] active:scale-90 transition-transform flex items-center justify-center"
          aria-label="Ver pedido"
        >
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {itemCount}
            </span>
          )}
        </button>

        {/* Location / Hours */}
        <a
          href="#contacto"
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400 hover:text-orange-400"
        >
          <MapPin className="w-5 h-5 text-zinc-300" />
          <span>Ubicación</span>
        </a>

        {/* Kitchen KDS Button */}
        <button
          onClick={onOpenKitchen}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400 hover:text-amber-400"
        >
          <ChefHat className="w-5 h-5 text-amber-400" />
          <span>Cocina</span>
        </button>
      </div>
    </>
  );
};
