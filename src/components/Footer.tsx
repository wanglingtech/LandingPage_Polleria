import React from 'react';
import { Flame, MapPin, Phone, Clock, MessageCircle, Heart, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#141414] text-neutral-300 pt-14 pb-24 md:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-neutral-800">
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D62828] to-amber-500 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl text-white tracking-tight leading-none">
                  {RESTAURANT_CONFIG.restaurantName}
                </span>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest mt-1">
                  {RESTAURANT_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              El auténtico sabor del pollo a la brasa peruano preparado en brasas de carbón vegetal con ingredientes frescos y papas doradas en casa.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={RESTAURANT_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-2xl bg-neutral-900 border border-neutral-700/80 hover:border-pink-500 hover:text-pink-400 text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-2xl bg-neutral-900 border border-neutral-700/80 hover:border-blue-500 hover:text-blue-400 text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-2xl bg-neutral-900 border border-neutral-700/80 hover:border-emerald-500 hover:text-emerald-400 text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { name: 'Inicio', id: 'inicio' },
                { name: 'Nuestra Carta', id: 'carta' },
                { name: 'Promociones', id: 'promociones' },
                { name: 'Ofertas Flash', id: 'ofertas' },
                { name: 'Nosotros', id: 'nosotros' },
                { name: 'Ubicación', id: 'ubicacion' },
                { name: 'Preguntas Frecuentes', id: 'faq' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Delivery Districts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider">
              Zonas con Cobertura
            </h4>
            <p className="text-xs text-neutral-400">
              Llevamos tu pedido caliente y en empaques térmicos:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {RESTAURANT_CONFIG.districtsAvailable.map((dist) => (
                <span
                  key={dist}
                  className="text-[11px] bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded-xl border border-neutral-800 font-medium"
                >
                  📍 {dist}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider">
              Atención Directa
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">{RESTAURANT_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-neutral-400 font-bold">{RESTAURANT_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-400">{RESTAURANT_CONFIG.openingHours.days}</p>
                  <p className="text-amber-400 font-bold">{RESTAURANT_CONFIG.openingHours.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {RESTAURANT_CONFIG.restaurantName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 font-medium">
            <span>Hecho con pasión por el sabor peruano</span>
            <Heart className="w-3.5 h-3.5 text-[#D62828] fill-current inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

