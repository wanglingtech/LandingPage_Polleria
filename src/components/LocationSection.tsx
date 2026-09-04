import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, MessageCircle, Copy, Check } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config';
import { useToast } from '../context/ToastContext';

export const LocationSection: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleLocationWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola 👋 ${RESTAURANT_CONFIG.restaurantName}, quisiera consultar sobre su ubicación exacta y zonas de delivery.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${RESTAURANT_CONFIG.address}, ${RESTAURANT_CONFIG.district}`);
    setCopied(true);
    showToast('Dirección copiada al portapapeles', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ubicacion" className="py-14 bg-[#FAF8F5] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] font-bold text-xs uppercase tracking-wider mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Punto de Venta & Cobertura</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#141414] tracking-tight">
              Visítanos o Pide tu Delivery 📍
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-200 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Abierto Ahora • Atención Inmediata</span>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Bento Tile 1: Address & Copy Action (Span 4 on lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D62828] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Ubicación Principal
                </span>
                <h3 className="font-heading font-black text-lg text-[#141414] mt-0.5">
                  {RESTAURANT_CONFIG.address}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  {RESTAURANT_CONFIG.district}, {RESTAURANT_CONFIG.city}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyAddress}
              className="w-full py-2.5 px-4 bg-[#FAF8F5] hover:bg-neutral-100 border border-neutral-200 rounded-2xl text-xs font-bold text-neutral-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">¡Dirección Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-600" />
                  <span>Copiar Dirección</span>
                </>
              )}
            </button>
          </div>

          {/* Bento Tile 2: Hours & Direct Phone (Span 4 on lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Horarios de Atención
                </span>
                <h3 className="font-heading font-black text-lg text-[#141414] mt-0.5">
                  {RESTAURANT_CONFIG.openingHours.days}
                </h3>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  {RESTAURANT_CONFIG.openingHours.hours}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
              <span className="text-neutral-600 font-medium">Central Telefónica:</span>
              <span className="font-black text-[#141414]">{RESTAURANT_CONFIG.phoneDisplay}</span>
            </div>
          </div>

          {/* Bento Tile 3: Direct Actions & WhatsApp (Span 4 on lg) */}
          <div className="lg:col-span-4 bg-[#141414] text-white rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Navegación & Soporte
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                ¿Vienes en camino?
              </h3>
              <p className="text-xs text-neutral-300">
                Abre las coordenadas exactas en Google Maps o pregúntanos por la mejor ruta.
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={RESTAURANT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-[#141414] text-xs font-black flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#D62828]" />
                <span>Cómo llegar en Google Maps</span>
              </a>

              <button
                onClick={handleLocationWhatsApp}
                className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Bento Tile 4: Embedded Google Maps Box (Span 12) */}
          <div className="lg:col-span-12 min-h-[360px] rounded-3xl overflow-hidden shadow-md border border-neutral-200/90 relative bg-neutral-100">
            <iframe
              title="Mapa interactivo de ubicación"
              src={RESTAURANT_CONFIG.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

