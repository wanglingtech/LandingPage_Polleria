import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { AppImage } from './common/AppImage';

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    const firstCard = container?.querySelector<HTMLElement>('[data-carousel-card]');
    if (!container || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(container).columnGap || '0');
    const offset = firstCard.offsetWidth + gap;
    container.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section id="testimonios" className="py-14 bg-[#141414] text-white border-b border-neutral-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Experiencias Reales</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Lo que opinan nuestros clientes 💬
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-2 w-full sm:w-auto sm:justify-start">
            <button
              onClick={() => scroll('left')}
              aria-label="Opinión anterior"
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Siguiente opinión"
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Grid of Reviews */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto no-scrollbar py-2 px-4 sm:px-1 -mx-4 sm:mx-0 scroll-smooth snap-x snap-mandatory scroll-px-4 sm:scroll-px-1 touch-pan-x"
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              data-carousel-card
              className="flex-none snap-center w-[min(23.75rem,calc(100vw-2rem))] bg-neutral-900/90 rounded-3xl border border-neutral-800 p-5 sm:p-6 flex flex-col justify-between shadow-lg space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-600" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* User info */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.avatar && (
                    <div className="w-10 h-10 rounded-2xl overflow-hidden border border-neutral-700 flex-shrink-0">
                      <AppImage
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-black text-sm text-white">{rev.name}</span>
                      {rev.verified && (
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verificado</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-amber-400 font-medium">Pidió: {rev.dish}</p>
                  </div>
                </div>

                <span className="text-[11px] text-neutral-500 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
