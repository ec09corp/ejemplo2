import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { RESTAURANT_CONFIG } from './config/restaurantConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { PromotionsSection } from './components/PromotionsSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { RestaurantInfo } from './components/RestaurantInfo';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { KitchenOrdersManager } from './components/KitchenOrdersManager';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  // Live state for easy customization / demonstration
  const [restaurantName, setRestaurantName] = useState(RESTAURANT_CONFIG.name);
  const [whatsappNumber, setWhatsappNumber] = useState(RESTAURANT_CONFIG.contact.whatsappNumber);

  // Modals state
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0c0d12] text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
        {/* Navigation Header */}
        <Navbar
          onOpenKitchen={() => setIsKitchenOpen(true)}
          onOpenConfig={() => setIsConfigOpen(true)}
          restaurantName={restaurantName}
          whatsappNumber={whatsappNumber}
        />

        {/* Main Content Sections */}
        <main className="flex-grow pb-16 sm:pb-0">
          {/* Hero section */}
          <Hero restaurantName={restaurantName} whatsappNumber={whatsappNumber} />

          {/* Interactive Digital Menu */}
          <MenuSection />

          {/* Promotions with discounted pricing */}
          <PromotionsSection />

          {/* About us narrative & pillars */}
          <AboutSection restaurantName={restaurantName} />

          {/* Photo Gallery with Lightbox */}
          <GallerySection />

          {/* Location, Hours & Service Info */}
          <RestaurantInfo restaurantName={restaurantName} whatsappNumber={whatsappNumber} />
        </main>

        {/* Footer */}
        <Footer
          onOpenConfig={() => setIsConfigOpen(true)}
          restaurantName={restaurantName}
          whatsappNumber={whatsappNumber}
        />

        {/* Cart Slide-Over Drawer */}
        <CartDrawer />

        {/* Checkout & Order Confirmation Modal */}
        <CheckoutModal
          onOpenKitchen={() => setIsKitchenOpen(true)}
          restaurantName={restaurantName}
          whatsappNumber={whatsappNumber}
        />

        {/* Kitchen Display System (KDS) & Order Management */}
        <KitchenOrdersManager
          isOpen={isKitchenOpen}
          onClose={() => setIsKitchenOpen(false)}
          restaurantName={restaurantName}
        />

        {/* Configuration Guide & Live Customizer Modal */}
        <ConfigGuideModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          currentName={restaurantName}
          onUpdateName={setRestaurantName}
          currentWhatsApp={whatsappNumber}
          onUpdateWhatsApp={setWhatsappNumber}
        />

        {/* Floating Quick Action Buttons & Mobile Dock */}
        <FloatingActions
          onOpenKitchen={() => setIsKitchenOpen(true)}
          restaurantName={restaurantName}
          whatsappNumber={whatsappNumber}
        />
      </div>
    </CartProvider>
  );
}
