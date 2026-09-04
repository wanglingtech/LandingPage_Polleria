import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ArrowRight, Tag, ShieldCheck, Zap } from 'lucide-react';
import { FLASH_OFFERS } from '../data/offers';
import { RESTAURANT_CONFIG } from '../config';
import { AppImage } from './common/AppImage';

interface OffersProps {
  onSelectProductById: (productId: string) => void;
}

export const Offers: React.FC<OffersProps> = ({ onSelectProductById }) => {
  // Demo countdown timers state in seconds
  const [timers, setTimers] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FLASH_OFFERS.forEach((o) => {
      initial[o.id] = o.expiresInSeconds || 19800;
    });
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next: Record<string, number> = { ...prev };
        Object.keys(next).forEach((key) => {
          if (next[key] > 0) next[key] -= 1;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      h: hours.toString().padStart(2, '0'),
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
    };
  };

  const featuredOffer = FLASH_OFFERS[0];
  const companionOffers = FLASH_OFFERS.slice(1);

  return (
    <section
      id="ofertas"
      className="py-14 bg-[#0F0E0D] text-white relative overflow-hidden border-b border-neutral-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#F77F00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bento Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Ofertas Relámpago</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Precios Irrepetibles por Tiempo Limitado 🔥
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Descuentos válidos para delivery y recojo. Se preparan al momento con ingredientes frescos del día.
          </p>
        </div>

        {/* Bento Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Featured Large Bento Deal Card (Span 7 on lg) */}
          {featuredOffer && (
            <div className="lg:col-span-7 bg-[#171615] rounded-3xl p-6 sm:p-7 border border-neutral-800/90 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                {/* Header row with badge & timer */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-[#D62828] text-white font-black text-xs px-3 py-1 rounded-xl uppercase tracking-wider shadow-md">
                    {featuredOffer.badge}
                  </span>

                  {/* Countdown Timer */}
                  {(() => {
                    const time = formatTimer(timers[featuredOffer.id] || 0);
                    return (
                      <div className="bg-black/60 border border-neutral-800 rounded-xl px-3 py-1.5 flex items-center gap-2">
                        <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>Termina en:</span>
                        </span>
                        <div className="flex items-center gap-1 font-mono font-black text-xs text-amber-400">
                          <span className="bg-neutral-800 px-1.5 py-0.5 rounded">{time.h}</span>
                          <span>:</span>
                          <span className="bg-neutral-800 px-1.5 py-0.5 rounded">{time.m}</span>
                          <span>:</span>
                          <span className="bg-neutral-800 px-1.5 py-0.5 rounded">{time.s}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Big Image Frame */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900">
                  <AppImage
                    src={featuredOffer.image}
                    alt={featuredOffer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-neutral-700 text-xs font-bold text-emerald-400">
                    Ahorras S/ {featuredOffer.saving.toFixed(2)}
                  </div>
                </div>

                {/* Text Information */}
                <div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-amber-400 transition-colors">
                    {featuredOffer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-semibold mt-0.5">
                    {featuredOffer.subtitle}
                  </p>
                  <p className="text-xs text-neutral-300 mt-2 line-clamp-2">
                    {featuredOffer.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Button */}
              <div className="pt-5 mt-5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline sm:block gap-2">
                  <span className="text-xs text-neutral-400 line-through block sm:inline">
                    {RESTAURANT_CONFIG.currencySymbol} {featuredOffer.originalPrice.toFixed(2)}
                  </span>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
                    {RESTAURANT_CONFIG.currencySymbol} {featuredOffer.offerPrice.toFixed(2)}
                  </div>
                </div>

                <button
                  id={`offer-btn-${featuredOffer.id}`}
                  onClick={() => onSelectProductById(featuredOffer.targetProductId)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#B91C1C] hover:from-[#E03131] hover:to-[#C92A2A] text-white font-black text-xs sm:text-sm shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Pedir Oferta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Companion Deals (Span 5 on lg - stacked bento tiles) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {companionOffers.map((offer) => {
              const time = formatTimer(timers[offer.id] || 0);

              return (
                <div
                  key={offer.id}
                  className="bg-[#171615] rounded-3xl p-5 border border-neutral-800/90 shadow-xl flex flex-col justify-between flex-1 relative overflow-hidden group"
                >
                  <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-400 text-neutral-950 font-black text-[11px] px-2.5 py-0.5 rounded-lg uppercase">
                        {offer.badge}
                      </span>
                      <div className="flex items-center gap-1 font-mono font-black text-[11px] text-amber-400 bg-black/60 px-2 py-0.5 rounded-lg border border-neutral-800">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{time.h}:{time.m}:{time.s}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-4 aspect-square rounded-xl overflow-hidden bg-neutral-900">
                        <AppImage
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="col-span-8">
                        <h4 className="font-heading font-black text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {offer.title}
                        </h4>
                        <p className="text-xs text-amber-200/80 font-medium line-clamp-1">
                          {offer.subtitle}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="pt-3 mt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 line-through">
                        {RESTAURANT_CONFIG.currencySymbol} {offer.originalPrice.toFixed(2)}
                      </span>
                      <div className="font-heading font-black text-lg sm:text-xl text-amber-400">
                        {RESTAURANT_CONFIG.currencySymbol} {offer.offerPrice.toFixed(2)}
                      </div>
                    </div>

                    <button
                      id={`offer-btn-${offer.id}`}
                      onClick={() => onSelectProductById(offer.targetProductId)}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
                    >
                      <span>Aprovechar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

