import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Menu,
  X,
  Clock,
  ChefHat,
  Sparkles,
  Phone,
  Sliders,
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getWhatsAppDirectChatUrl } from '../utils/whatsapp';

interface NavbarProps {
  onOpenKitchen: () => void;
  onOpenConfig: () => void;
  restaurantName?: string;
  whatsappNumber?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenKitchen,
  onOpenConfig,
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const { itemCount, subtotalUSD, setIsCartOpen, orders } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeKitchenOrders = orders.filter(
    (o) => o.status === 'nuevo' || o.status === 'en_cocina'
  ).length;

  const directWhatsAppUrl = getWhatsAppDirectChatUrl(whatsappNumber, restaurantName);

  return (
    <>
      <header
        id="main-navigation"
        className="sticky top-0 z-40 bg-[#0e0f14]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all"
      >
        {/* Top Info Banner */}
        <div className="bg-gradient-to-r from-orange-600/90 via-amber-600/90 to-red-600/90 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="flex h-2 w-2 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>{RESTAURANT_CONFIG.schedule.isOpenNowText}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 opacity-90">
                <Clock className="w-3.5 h-3.5" /> {RESTAURANT_CONFIG.delivery.estimatedMinutes}
              </span>
              <span className="opacity-90">•</span>
              <a
                href={`tel:${RESTAURANT_CONFIG.contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" /> {RESTAURANT_CONFIG.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center focus:outline-none group">
              <Logo name={restaurantName} size="md" showTagline />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm text-zinc-300">
              <a
                href="#menu"
                className="hover:text-orange-400 transition-colors py-2 flex items-center gap-1.5"
              >
                <span>Menú Digital</span>
                <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-orange-500/30">
                  USD
                </span>
              </a>
              <a
                href="#promociones"
                className="hover:text-orange-400 transition-colors py-2 flex items-center gap-1 text-amber-400"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Promociones</span>
              </a>
              <a href="#nosotros" className="hover:text-orange-400 transition-colors py-2">
                Nosotros
              </a>
              <a href="#galeria" className="hover:text-orange-400 transition-colors py-2">
                Galería
              </a>
              <a href="#contacto" className="hover:text-orange-400 transition-colors py-2">
                Ubicación
              </a>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Quick Chat */}
              <a
                id="navbar-whatsapp-btn"
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat de WhatsApp con el restaurante"
                className="hidden sm:inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden xl:inline">WhatsApp Directo</span>
              </a>

              {/* Kitchen KDS Manager Quick Toggle */}
              <button
                id="navbar-kitchen-btn"
                onClick={onOpenKitchen}
                title="Panel de Cocina / KDS de Pedidos"
                className="relative inline-flex items-center gap-1.5 bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 border border-zinc-700/80 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              >
                <ChefHat className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Panel Cocina</span>
                {activeKitchenOrders > 0 && (
                  <span className="bg-amber-500 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {activeKitchenOrders}
                  </span>
                )}
              </button>

              {/* Personalization / Central Config Guide */}
              <button
                id="navbar-config-btn"
                onClick={onOpenConfig}
                title="Ajustes de Marca y Configuración Rápida"
                className="inline-flex items-center p-2 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/60 rounded-xl transition-all"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="navbar-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                  Ver Pedido
                </span>
                <span className="text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/20">
                  {itemCount > 0 ? `USD ${subtotalUSD.toFixed(2)}` : 'USD 0.00'}
                </span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0e0f14] shadow-md animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle button */}
              <button
                id="navbar-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl hover:bg-zinc-800 focus:outline-none"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden bg-[#12131a] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-zinc-800/60 text-orange-400 flex items-center justify-between"
              >
                <span>🍔 Ver Menú Digital</span>
                <span className="text-xs text-zinc-400">Precios en USD</span>
              </a>
              <a
                href="#promociones"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-amber-300 hover:bg-zinc-800/40 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Promociones Especiales</span>
              </a>
              <a
                href="#nosotros"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/40"
              >
                📖 Sobre Nosotros
              </a>
              <a
                href="#galeria"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/40"
              >
                📸 Galería de Platos y Salón
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800/40"
              >
                📍 Ubicación y Horarios
              </a>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black font-bold py-2.5 rounded-xl text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Escribir por WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenKitchen();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-zinc-800 text-zinc-200 py-2 rounded-lg text-xs font-semibold"
                >
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>KDS Cocina</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConfig();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-zinc-800 text-zinc-200 py-2 rounded-lg text-xs font-semibold"
                >
                  <Sliders className="w-4 h-4 text-orange-400" />
                  <span>Ajustes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
