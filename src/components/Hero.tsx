import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Star,
  Bike,
  UtensilsCrossed,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ASSET_IMAGES } from '../data/assets';
import { AppImage } from './common/AppImage';

interface HeroProps {
  onExploreMenu?: () => void;
  onOpenProductModalById?: (productId: string) => void;
  onOrderClick?: () => void;
  onPromosClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenProductModalById,
  onOrderClick,
  onPromosClick,
}) => {
  const { applyCoupon } = useCart();
  const { showToast } = useToast();

  const handleMenuClick = onExploreMenu || onOrderClick || (() => {});
  const handlePromoClick = onPromosClick || onExploreMenu || (() => {});
  const handleOpenModal = onOpenProductModalById || (() => {});

  const handleWhatsAppHero = () => {
    const text = encodeURIComponent(
      `Hola 👋 ${RESTAURANT_CONFIG.restaurantName}! Deseo hacer un pedido de pollo a la brasa para delivery.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleClaimFirstOrder = () => {
    const res = applyCoupon('PRIMERPEDIDO');
    if (res.success) {
      showToast('¡Cupón PRIMERPEDIDO aplicado con 20% de descuento!', 'success');
    }
    handleMenuClick();
  };

  return (
    <section
      id="inicio"
      className="relative bg-[#0F0E0D] text-white pt-6 pb-14 sm:pb-16 lg:py-16 overflow-hidden border-b border-neutral-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D62828]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#F77F00]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          {/* Bento Tile 1: Main Headline & Core CTA (Span 12 on mobile, 8 on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-12 lg:col-span-7 bg-[#171615] rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-800/90 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D62828]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Tag / Live Status badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/30 text-amber-300 text-xs font-bold shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Brasas encendidas • Pedidos en vivo</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-800 font-medium">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{RESTAURANT_CONFIG.openingHours.hours}</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                El auténtico sabor del pollo a la{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] via-[#F77F00] to-[#D62828]">
                  brasa peruano
                </span>{' '}
                🔥
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
                Piel dorada y crocante, carne tierna y jugosa, papas peruanas crujientes y 4 cremas caseras recién batidas. Pide directo con delivery rápido.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-6 mt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-3 relative z-10">
              <button
                id="hero-menu-cta"
                onClick={handleMenuClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#B91C1C] hover:from-[#E03131] hover:to-[#C92A2A] text-white font-black text-sm sm:text-base shadow-lg shadow-red-950/40 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Ver Nuestra Carta</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-whatsapp-cta"
                onClick={handleWhatsAppHero}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span className="text-lg">💬</span>
                <span>Pedir por WhatsApp</span>
              </button>
            </div>
          </motion.div>

          {/* Bento Tile 2: Star Product Showcase (Span 12 on mobile, 5 on lg) */}
          <motion.div
            id="hero-star-product-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-12 lg:col-span-5 bg-[#171615] rounded-3xl p-5 sm:p-6 border border-neutral-800/90 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Visual Container */}
            <div
              onClick={() => handleOpenModal('prod-4')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal('prod-4');
                }
              }}
              className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <AppImage
                src={ASSET_IMAGES.brand.heroStarPollo}
                alt="Pollo a la brasa entero con papas fritas y ensalada fresca"
                priority={true}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Tag Left */}
              <div className="absolute top-3 left-3 bg-[#D62828] text-white text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-md flex items-center gap-1.5 pointer-events-none">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Estrella de la Casa</span>
              </div>

              {/* Price Tag Right */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-neutral-700 text-white px-3 py-1 rounded-xl text-right pointer-events-none">
                <span className="text-[10px] text-neutral-400 block line-through">S/ 69.90</span>
                <span className="text-sm sm:text-base font-black text-amber-400 font-heading">
                  S/ 59.90
                </span>
              </div>

              {/* Bottom Caption in Image */}
              <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>5.0 (320+ opiniones)</span>
                </div>
                <h3 className="font-heading font-black text-base sm:text-lg text-white leading-tight">
                  1 Pollo Entero + Papas & Ensalada
                </h3>
              </div>
            </div>

            {/* Bottom Meta & Customizer Button */}
            <div className="pt-4 mt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Incluye 4 cremas artesanales</span>
                </span>
                <span className="text-[11px] text-neutral-400 block">Rinde para 3 - 4 personas</span>
              </div>

              <button
                id="hero-customize-star-product-btn"
                onClick={() => handleOpenModal('prod-4')}
                className="w-full sm:w-auto px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Personalizar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Bento Tile 3: Interactive Promo Coupon Tile (Span 12 on mobile, 4 on md/lg) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-4 bg-gradient-to-br from-red-950/80 to-[#171615] rounded-3xl p-5 border border-red-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                <span>Beneficio Exclusivo</span>
              </div>
              <h4 className="font-heading font-black text-lg text-white">
                20% OFF en tu 1er Pedido
              </h4>
              <p className="text-xs text-neutral-300">
                Aplica el cupón oficial al armar tu pedido para obtener descuento inmediato.
              </p>
            </div>

            <div className="pt-3 mt-3 flex items-center justify-between gap-2 border-t border-red-500/20">
              <div className="bg-black/50 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider">
                PRIMERPEDIDO
              </div>
              <button
                onClick={handleClaimFirstOrder}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </div>
          </motion.div>

          {/* Bento Tile 4: Charcoal Grilling Tradition (Span 12 on mobile, 4 on md/lg) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="md:col-span-4 bg-[#171615] rounded-3xl p-5 border border-neutral-800/90 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-500/30 text-[#D62828] flex items-center justify-center">
                <Flame className="w-5 h-5 fill-[#D62828]" />
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-800/50">
                100% Leña & Carbón
              </span>
            </div>

            <div className="space-y-1 mt-3">
              <h4 className="font-heading font-black text-base text-white">
                Macerado 24 Horas
              </h4>
              <p className="text-xs text-neutral-400">
                Receta secreta con hierbas peruanas y especias que garantizan jugosidad total.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300 font-semibold">
              <span>Papas peruanas doradas</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </motion.div>

          {/* Bento Tile 5: Speed & Fast Delivery Guarantee (Span 12 on mobile, 4 on md/lg) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:col-span-4 bg-[#171615] rounded-3xl p-5 border border-neutral-800/90 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/50">
                Empaques Térmicos
              </span>
            </div>

            <div className="space-y-1 mt-3">
              <h4 className="font-heading font-black text-base text-white">
                Delivery 25 - 40 min
              </h4>
              <p className="text-xs text-neutral-400">
                Llega caliente y con la piel crujiente hasta la puerta de tu hogar.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300 font-semibold">
              <span>{RESTAURANT_CONFIG.district} y alrededores</span>
              <span className="text-emerald-400 font-bold">Activo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

