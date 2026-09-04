import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config';

export const WhatsAppButton: React.FC = () => {
  const [showBubble, setShowBubble] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent(
      `¡Hola! 👋 Quisiera hacer un pedido en ${RESTAURANT_CONFIG.restaurantName}.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Speech Bubble / Tooltip */}
      {showBubble && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-neutral-900 px-3.5 py-2 rounded-2xl shadow-xl border border-neutral-200 text-xs font-semibold animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>¿Antojo de pollo? ¡Pide por WhatsApp! 🍗</span>
          <button
            onClick={() => setShowBubble(false)}
            className="text-neutral-400 hover:text-neutral-700 p-0.5 ml-1 rounded-full"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-emerald-500/20"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping -z-10 group-hover:hidden" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
      </button>
    </div>
  );
};
