import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CreditCard,
  Banknote,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Car,
  Wine,
  Wifi,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { getWhatsAppDirectChatUrl } from '../utils/whatsapp';

interface RestaurantInfoProps {
  restaurantName?: string;
  whatsappNumber?: string;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const { contact, schedule } = RESTAURANT_CONFIG;
  const directWhatsAppUrl = getWhatsAppDirectChatUrl(whatsappNumber, restaurantName);

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#0a0b10] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visítanos o Pide a Domicilio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Ubicación, Horarios y Contacto
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Estamos listos para recibirte en nuestro local o llevarte el mejor sabor de las brasas
            directo a tu puerta.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Details & Schedule Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Address Card */}
            <div className="bg-[#141520] border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Dirección Principal
                  </span>
                  <h4 className="text-lg font-bold text-white">{contact.address}</h4>
                  <p className="text-xs text-zinc-400">{contact.addressNotes}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-zinc-700 transition-all"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-[#141520] border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Horarios de Atención
                    </span>
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Abierto Hoy
                    </span>
                  </div>
                  <div className="pt-1 space-y-1 text-sm text-zinc-300">
                    <p className="flex justify-between border-b border-zinc-800/80 py-1">
                      <span className="text-zinc-400">Lun – Jue:</span>
                      <span className="font-semibold text-white">12:00 PM – 10:30 PM</span>
                    </p>
                    <p className="flex justify-between py-1">
                      <span className="text-zinc-400">Vie – Dom:</span>
                      <span className="font-semibold text-white">12:00 PM – 11:30 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channels (Phone & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp direct */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#141520] border border-[#25D366]/30 hover:border-[#25D366] p-5 rounded-3xl flex items-center gap-3.5 transition-all group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    WhatsApp Oficial
                  </span>
                  <span className="text-sm font-black text-white group-hover:text-[#25D366]">
                    {contact.whatsappDisplay}
                  </span>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href={`tel:${contact.phone.replace(/\D/g, '')}`}
                className="bg-[#141520] border border-zinc-800 hover:border-orange-500/60 p-5 rounded-3xl flex items-center gap-3.5 transition-all group"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-500/15 text-orange-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Central Telefónica
                  </span>
                  <span className="text-sm font-black text-white group-hover:text-orange-400">
                    {contact.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Payment Methods */}
            <div className="bg-[#141520] border border-zinc-800 p-5 rounded-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Métodos de Pago Aceptados
              </span>
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  Efectivo
                </span>
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  Tarjetas Débito / Crédito
                </span>
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  Yappy / Transferencia Bancaria
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Styled Map & Amenities */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Element (Prepared for Google Maps) */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 h-80 sm:h-96 flex flex-col justify-end">
              {/* Styled Vector Map Backdrop */}
              <div className="absolute inset-0 bg-[#161722] opacity-90">
                {/* SVG stylized street map grid */}
                <svg
                  className="w-full h-full opacity-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 50 Q 150 70 400 30 M0 140 Q 200 130 400 160 M0 240 Q 180 250 400 230"
                    stroke="#FF5722"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M80 0 Q 90 150 100 300 M240 0 Q 230 180 250 300 M340 0 Q 330 160 320 300"
                    stroke="#FF9800"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="200" cy="140" r="30" fill="#FF5722" opacity="0.3" />
                  <circle cx="200" cy="140" r="10" fill="#FF5722" />
                </svg>
              </div>

              {/* Floating Pin Card in Center of Map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-orange-400 opacity-60"></span>
                  <div className="relative w-12 h-12 bg-gradient-to-tr from-red-600 to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-white border-2 border-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-2 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-orange-500/50 shadow-xl whitespace-nowrap text-center">
                  <span className="text-xs font-black text-white">{restaurantName}</span>
                  <span className="text-[10px] text-amber-400 block font-mono">
                    Calle 50, Las Terrazas
                  </span>
                </div>
              </div>

              {/* Map Footer Bar with One-Click Direction */}
              <div className="relative z-10 bg-black/85 backdrop-blur-md p-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-zinc-400 block">Coordenadas del local:</span>
                  <span className="font-mono text-white font-bold">8.9824° N, 79.5199° W</span>
                </div>

                <a
                  href={contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>Cómo Llegar (GPS)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Amenities & Services Grid */}
            <div className="bg-[#141520] border border-zinc-800 p-5 rounded-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Comodidades y Opciones de Servicio
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <Car className="w-4 h-4 text-orange-400" />
                  <span>Estacionamiento</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <Wifi className="w-4 h-4 text-amber-400" />
                  <span>Wi-Fi Gratis</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <Wine className="w-4 h-4 text-red-400" />
                  <span>Terraza & Bar</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/80 p-2.5 rounded-xl border border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Pet Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
