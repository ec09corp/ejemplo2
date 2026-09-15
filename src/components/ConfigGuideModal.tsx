import React, { useState } from 'react';
import { X, Sliders, Check, Copy, Sparkles, FileCode, Smartphone, Store } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onUpdateName: (name: string) => void;
  currentWhatsApp: string;
  onUpdateWhatsApp: (phone: string) => void;
}

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onUpdateName,
  currentWhatsApp,
  onUpdateWhatsApp,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [tempName, setTempName] = useState(currentName);
  const [tempPhone, setTempPhone] = useState(currentWhatsApp);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const sampleProductCode = `// Para agregar un producto nuevo, abre src/config/restaurantConfig.ts y añade:
{
  id: 'h-nuevo-01',
  name: 'Burger Doble Queso BBQ',
  description: 'Carne Angus 200g, queso cheddar fundido y cebolla frita.',
  priceUSD: 14.50, // Siempre en USD
  categoryId: 'hamburguesas',
  image: 'https://tus-imagenes.com/foto.jpg',
  badge: 'Nuevo',
  isAvailable: true,
}`;

  const handleApplyPreview = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(tempName.trim() || RESTAURANT_CONFIG.name);
    onUpdateWhatsApp(tempPhone.trim() || RESTAURANT_CONFIG.contact.whatsappNumber);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleProductCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      id="config-guide-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#141520] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#181926] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                Panel de Personalización & Guía de Configuración
              </h3>
              <p className="text-xs text-zinc-400">
                Estructura centralizada en <code className="text-amber-400">src/config/restaurantConfig.ts</code>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/80 rounded-xl"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Quick Live Preview Form */}
          <form onSubmit={handleApplyPreview} className="bg-[#191a26] border border-orange-500/30 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Probar Nombre y WhatsApp en Vivo (Vista Previa)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-300 uppercase block">
                  Nombre del Restaurante:
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Ej. Fuego & Brasa, La Parrilla 50..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-white text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-300 uppercase block">
                  Número de WhatsApp (con código país):
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="Ej. 50769998877 sin espacios"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-9 pr-3 py-2 text-white text-xs font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
              >
                <span>Aplicar a la Vista Actual</span>
              </button>

              {savedNotice && (
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <Check className="w-4 h-4" /> ¡Actualizado en tiempo real!
                </span>
              )}
            </div>
          </form>

          {/* Centralized file explanation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FileCode className="w-4 h-4 text-orange-400" />
              <span>Dónde se edita todo en el código:</span>
            </h4>
            <div className="bg-[#0e0f15] border border-zinc-800 rounded-2xl p-4 space-y-3 text-xs text-zinc-300">
              <p>
                Todo el menú, precios, WhatsApp, categorías y redes sociales están centralizados en un único archivo:
              </p>
              <div className="font-mono text-amber-400 bg-black/60 p-2.5 rounded-xl border border-zinc-800">
                src/config/restaurantConfig.ts
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[12px]">
                <li><strong className="text-white">RESTAURANT_CONFIG:</strong> Nombre, WhatsApp, teléfono, dirección, horarios y redes.</li>
                <li><strong className="text-white">CATEGORIES:</strong> Íconos, títulos y descripción de categorías.</li>
                <li><strong className="text-white">PRODUCTS:</strong> Lista completa de productos, precios en USD, fotos y opciones.</li>
                <li><strong className="text-white">PROMOTIONS:</strong> Ofertas especiales con precio original y promocional.</li>
                <li><strong className="text-white">GALLERY_ITEMS:</strong> Fotografías en alta calidad de platillos y ambiente.</li>
              </ul>
            </div>
          </div>

          {/* Code snippet example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">Ejemplo: Cómo agregar un nuevo producto</span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '¡Copiado!' : 'Copiar plantilla'}</span>
              </button>
            </div>
            <pre className="bg-[#0c0d12] border border-zinc-800 text-zinc-300 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto">
              {sampleProductCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
