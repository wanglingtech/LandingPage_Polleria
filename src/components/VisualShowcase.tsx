import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { ASSET_IMAGES } from '../data/assets';
import { AppImage } from './common/AppImage';

interface VisualShowcaseProps {
  onExploreMenu?: () => void;
}

export const VisualShowcase: React.FC<VisualShowcaseProps> = ({ onExploreMenu }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const items = ASSET_IMAGES.showcase;
  const totalItems = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Auto rotate every 3.8 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Smooth scroll sync with currentIndex
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    if (firstChild) {
      const itemWidth = firstChild.offsetWidth + 16; // width + gap
      container.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="galeria-showcase"
      className="py-12 bg-[#0d0d0c] text-white border-b border-neutral-800 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>Galería Visual • El Sabor de Nuestras Brasas</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Directo del horno a tu mesa 🔥
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Descubre por qué nuestro pollo a la brasa, papas fritas crocantes y cremas caseras son los favoritos de las familias.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Ver foto anterior"
              className="p-2.5 sm:p-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Ver foto siguiente"
              className="p-2.5 sm:p-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onExploreMenu?.()}
              className="flex-shrink-0 w-[82vw] sm:w-[46vw] lg:w-[31.5%] group relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-xl transition-all duration-300 hover:border-neutral-700 cursor-pointer"
            >
              {/* Image Container with aspect ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <AppImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-md">
                    <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{item.tag}</span>
                  </span>
                </div>

                {/* Caption overlay at the bottom */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                  <h3 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 line-clamp-1">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-amber-400 shadow-sm'
                  : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
