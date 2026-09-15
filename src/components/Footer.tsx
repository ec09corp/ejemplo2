import React from 'react';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Video,
  ArrowUp,
  Heart,
  Sliders,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';
import { Logo } from './Logo';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

interface FooterProps {
  onOpenConfig: () => void;
  restaurantName?: string;
  whatsappNumber?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConfig,
  restaurantName = RESTAURANT_CONFIG.name,
  whatsappNumber = RESTAURANT_CONFIG.contact.whatsappNumber,
}) => {
  const { social, contact, schedule } = RESTAURANT_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#08090d] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <Logo name={restaurantName} size="md" showTagline />
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {RESTAURANT_CONFIG.subtitle}
            </p>

            {/* Social Network Links */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                Síguenos en Redes Sociales
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram oficial"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-zinc-800 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook oficial"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-zinc-800 transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* TikTok */}
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok oficial"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all"
                >
                  <Video className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp oficial"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-zinc-800 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <a href="#hero-section" className="hover:text-orange-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  Menú Digital (USD)
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-orange-400 transition-colors">
                  Promociones
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-orange-400 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-orange-400 transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-orange-400 transition-colors">
                  Ubicación & Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Horarios</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-200 block font-semibold">Lunes a Jueves:</span>
                  <span>12:00 PM – 10:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-200 block font-semibold">Viernes a Domingo:</span>
                  <span>12:00 PM – 11:30 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                {schedule.isOpenNowText}
              </p>
            </div>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atención</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <span>{contact.whatsappDisplay}</span>
              </div>
            </div>

            {/* Config Guide quick button for store owner */}
            <div className="pt-2">
              <button
                onClick={onOpenConfig}
                className="w-full flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span>Personalizar Marca / Ver Configuración</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {restaurantName}. Todos los derechos reservados. Precios en
            dólares estadounidenses (USD).
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-1.5 rounded-xl transition-all"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
