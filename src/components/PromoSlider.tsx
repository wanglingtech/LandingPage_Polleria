import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, ArrowRight, Tag, Percent } from 'lucide-react';
import { PROMO_BANNERS } from '../data/offers';
import { PromoBanner } from '../types';
import { RESTAURANT_CONFIG } from '../config';
import { AppImage } from './common/AppImage';

interface PromoSliderProps {
  onSelectProduct: (productId: string) => void;
}

export const PromoSlider: React.FC<PromoSliderProps> = ({ onSelectProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPromo: PromoBanner = PROMO_BANNERS[currentIndex];

  const handleCtaClick = () => {
    if (currentPromo.targetProductId) {
      onSelectProduct(currentPromo.targetProductId);
    }
  };

  return (
    <section
      id="promociones"
      className="py-10 bg-[#FAF8F5] relative border-b border-neutral-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/80 text-[#D62828] font-bold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promociones Especiales</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#141414] tracking-tight">
              Combos & Ofertas de la Semana 🔥
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Promoción anterior"
              className="p-2.5 rounded-2xl bg-white hover:bg-neutral-100 border border-neutral-200/90 text-neutral-800 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente promoción"
              className="p-2.5 rounded-2xl bg-white hover:bg-neutral-100 border border-neutral-200/90 text-neutral-800 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bento Promotion Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[360px] sm:min-h-[380px] lg:min-h-[420px] bg-[#141414] border border-neutral-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className={`w-full h-full min-h-[360px] sm:min-h-[380px] lg:min-h-[420px] bg-gradient-to-r ${currentPromo.bgGradient} relative flex flex-col justify-center text-white overflow-hidden`}
            >
              {/* Background image & subtle overlay */}
              <div className="absolute inset-0 z-0">
                <AppImage
                  src={currentPromo.image}
                  alt={currentPromo.title}
                  showSkeleton={false}
                  className="w-full h-full object-cover object-center mix-blend-overlay opacity-30 transform scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 sm:to-transparent pointer-events-none" />
              </div>

              {/* Banner Content Grid */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 lg:p-12 items-center">
                <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
                  {/* Tag Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-black tracking-wider uppercase">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{currentPromo.tag}</span>
                    {currentPromo.discountText && (
                      <>
                        <span className="opacity-40">•</span>
                        <span className="text-white font-bold">{currentPromo.discountText}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                    {currentPromo.title}
                  </h3>

                  <p className="text-base sm:text-lg text-amber-200/90 font-medium">
                    {currentPromo.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-200 max-w-xl leading-relaxed">
                    {currentPromo.description}
                  </p>

                  {/* Pricing and CTA */}
                  <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {currentPromo.price && (
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl sm:text-4xl font-black text-amber-400 font-heading">
                          {RESTAURANT_CONFIG.currencySymbol} {currentPromo.price.toFixed(2)}
                        </span>
                        {currentPromo.oldPrice && (
                          <span className="text-sm sm:text-base text-neutral-300 line-through">
                            {RESTAURANT_CONFIG.currencySymbol} {currentPromo.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      id={`promo-cta-${currentPromo.id}`}
                      onClick={handleCtaClick}
                      className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#141414] font-black text-sm sm:text-base rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Flame className="w-4 h-4 fill-current" />
                      <span>{currentPromo.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right side preview tile */}
                <div className="hidden lg:flex lg:col-span-5 justify-center">
                  <div className="relative w-72 h-72 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <AppImage
                      src={currentPromo.image}
                      alt={currentPromo.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-center bg-black/75 backdrop-blur-sm py-2 px-3 rounded-xl text-xs font-bold text-amber-300 border border-white/10">
                      🔥 ¡Recién salido de las brasas!
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
            {PROMO_BANNERS.map((promo, idx) => (
              <button
                key={promo.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir a promoción ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 bg-amber-400 shadow-md'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

