import React from 'react';
import { Home, Utensils, Flame, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate }) => {
  const { totalItems, openCart } = useCart();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola! 👋 Quisiera hacer un pedido en ${RESTAURANT_CONFIG.restaurantName}.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-2 py-1.5 shadow-2xl safe-bottom">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex flex-col items-center justify-center py-1 text-neutral-600 hover:text-[#D62828] active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Inicio</span>
        </button>

        {/* Carta */}
        <button
          onClick={() => onNavigate('carta')}
          className="flex flex-col items-center justify-center py-1 text-neutral-600 hover:text-[#D62828] active:scale-95 transition-transform"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Carta</span>
        </button>

        {/* Promos */}
        <button
          onClick={() => onNavigate('promociones')}
          className="flex flex-col items-center justify-center py-1 text-[#D62828] active:scale-95 transition-transform"
        >
          <Flame className="w-5 h-5 fill-[#D62828]" />
          <span className="text-[10px] font-black mt-0.5">Promos</span>
        </button>

        {/* Carrito with Badge */}
        <button
          id="mobile-nav-cart-btn"
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 text-neutral-800 hover:text-[#D62828] active:scale-95 transition-transform"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D62828] text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">Carrito</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
