import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Flame, PhoneCall, Heart, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config';
import { useScrollLock } from '../hooks/useScrollLock';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onFocusSearch?: () => void;
  onSearchClick?: () => void;
  onToggleFavorites?: () => void;
  onFavoritesClick?: () => void;
  showFavoritesOnly?: boolean;
  onSelectCategory?: (categoryId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onFocusSearch,
  onSearchClick,
  onToggleFavorites,
  onFavoritesClick,
  showFavoritesOnly = false,
  onSelectCategory,
}) => {
  const { totalItems, openCart, favorites } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleSearchAction = () => {
    if (onFocusSearch) {
      onFocusSearch();
    } else if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleFavoritesAction = () => {
    if (onToggleFavorites) {
      onToggleFavorites();
    } else if (onFavoritesClick) {
      onFavoritesClick();
    }
  };

  const navLinks = [
    { label: 'Inicio', id: 'inicio', category: 'todos' },
    { label: 'Carta', id: 'carta', category: 'todos' },
    { label: 'Promociones', id: 'promociones', category: 'promociones' },
    { label: 'Combos', id: 'carta', category: 'combos' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Ubicación', id: 'ubicacion' },
  ];

  const handleNavClick = (link: { id: string; category?: string }) => {
    setMobileMenuOpen(false);
    if (link.category && onSelectCategory) {
      onSelectCategory(link.category);
    }
    if (onNavigate) {
      onNavigate(link.id);
    } else {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppQuickCall = () => {
    const defaultText = encodeURIComponent(
      `Hola 👋 ${RESTAURANT_CONFIG.restaurantName}, quisiera hacer una consulta o pedido.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${defaultText}`, '_blank');
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-neutral-800'
          : 'bg-[#141414] border-b border-neutral-800/90'
      }`}
    >
      {/* Top micro bar with schedule & delivery info */}
      <div className="bg-[#8D1111] text-amber-100 text-[10px] min-[380px]:text-[11px] sm:text-xs py-1 px-2 sm:px-4 text-center font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 leading-tight">
        <span className="inline-flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          <span className="whitespace-nowrap">Pollo al carbón 100% natural</span>
        </span>
        <span className="hidden sm:inline opacity-50">•</span>
        <span className="hidden md:inline whitespace-nowrap">
          Delivery activo: {RESTAURANT_CONFIG.openingHours.hours}
        </span>
        <span className="opacity-50">•</span>
        <span className="font-bold text-amber-300 whitespace-nowrap">
          ¡Cupón BRASA10 para 10% OFF!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-1.5 sm:gap-2">
          {/* Logo */}
          <a
            href="#inicio"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick({ id: 'inicio' });
            }}
            className="flex items-center gap-1.5 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl p-0.5 sm:p-1 cursor-pointer flex-shrink min-w-0"
          >
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#D62828] to-[#991B1B] flex items-center justify-center shadow-md shadow-red-950/40 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400 fill-amber-400 animate-pulse flex-shrink-0" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-black text-sm min-[360px]:text-base sm:text-2xl text-white tracking-tight leading-none truncate">
                Brasas <span className="text-[#F77F00]">del Sabor</span>
              </span>
              <span className="hidden sm:block text-[9px] sm:text-xs text-neutral-400 uppercase tracking-widest font-bold mt-0.5">
                Pollería & Brasas
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-2 text-sm font-bold text-neutral-200 hover:text-amber-400 hover:bg-neutral-800/70 rounded-xl transition-colors duration-150 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search button (Hidden on mobile as requested, present on md+) */}
            <button
              id="navbar-search-btn"
              onClick={handleSearchAction}
              aria-label="Buscar en la carta"
              className="hidden md:flex p-2 sm:p-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-2xl transition-colors cursor-pointer min-w-[38px] min-h-[38px] items-center justify-center"
              title="Buscar en la carta"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </button>

            {/* Favorites button */}
            <button
              id="navbar-favorites-btn"
              onClick={handleFavoritesAction}
              aria-label="Ver productos favoritos"
              className={`p-2 sm:p-2.5 rounded-2xl transition-colors relative cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center flex-shrink-0 ${
                showFavoritesOnly
                  ? 'text-rose-400 bg-rose-950/50 border border-rose-800/80'
                  : 'text-neutral-300 hover:text-rose-400 hover:bg-neutral-800'
              }`}
              title="Mis Favoritos"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>

            {/* Cart Button with Count Badge */}
            <button
              id="navbar-cart-btn"
              onClick={openCart}
              aria-label={`Abrir carrito (${totalItems} productos)`}
              className="relative flex items-center gap-1.5 p-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#D62828] to-[#B91C1C] hover:from-[#E03131] hover:to-[#C92A2A] text-white rounded-2xl font-black shadow-md shadow-red-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] flex-shrink-0"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="hidden sm:inline text-sm font-black">Carrito</span>
              {totalItems > 0 && (
                <span
                  id="cart-badge-count"
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 text-[#141414] text-[10px] sm:text-xs font-black rounded-full flex items-center justify-center shadow-sm animate-bounce"
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Quick WhatsApp Button Desktop */}
            <button
              id="navbar-whatsapp-cta"
              onClick={handleWhatsAppQuickCall}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md shadow-emerald-950/30 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4 flex-shrink-0" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle (Always visible and anchored on mobile) */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-2xl transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center flex-shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Menu className="w-5 h-5 flex-shrink-0" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-sm flex flex-col justify-start overscroll-contain animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Container */}
          <div
            id="mobile-dropdown-menu"
            className="w-full bg-[#141414] border-b border-neutral-800 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-neutral-800/90 bg-[#191817]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D62828] to-[#991B1B] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-white text-sm">
                    Brasas <span className="text-[#F77F00]">del Sabor</span>
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Menú Principal
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="p-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="w-full text-left flex items-center justify-between px-4 py-3 text-base font-bold text-neutral-200 hover:text-amber-400 hover:bg-neutral-800/80 rounded-2xl transition-colors cursor-pointer active:scale-[0.99]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-neutral-500 font-mono">→</span>
                </button>
              ))}
            </div>

            {/* Bottom info & WhatsApp CTA */}
            <div className="p-4 pt-3 border-t border-neutral-800/80 bg-[#11100F] space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{RESTAURANT_CONFIG.openingHours.hours}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Abierto Ahora</span>
                </span>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppQuickCall();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-md shadow-emerald-950/40 cursor-pointer transition-transform active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>Pedir por WhatsApp ({RESTAURANT_CONFIG.phoneDisplay})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

