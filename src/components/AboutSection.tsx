import React from 'react';
import { Flame, Award, Users, Star, Bike, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config';
import { ASSET_IMAGES } from '../data/assets';
import { AppImage } from './common/AppImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-14 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Bento Tile 1: Main Story Card (Span 8 on lg) */}
          <div className="md:col-span-12 lg:col-span-8 bg-[#141414] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D62828]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-[#D62828]" />
                <span>Nuestra Historia & Pasión</span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                El sabor auténtico que reúne a la familia peruana 🇵🇪
              </h2>

              <p className="text-xs sm:text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                En <strong className="text-white font-bold">{RESTAURANT_CONFIG.restaurantName}</strong> cuidamos cada detalle: desde el macerado de 24 horas con hierbas andinas hasta el asado a fuego lento sobre carbón vegetal de algarrobo. El resultado es un pollo con piel ultra crocante y carne suave y jugosa.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 mt-4 border-t border-neutral-800/80 relative z-10">
              {[
                'Pollo seleccionado del día, jamás congelado',
                'Papas peruanas crujientes y doradas en casa',
                'Cremas artesanales: ají pollero, huacatay, tártara y mayonesa',
                'Empaques térmicos para mantener la temperatura óptima',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Tile 2: 100% Traditional Charcoal Visual Badge (Span 4 on lg) */}
          <div className="md:col-span-12 lg:col-span-4 bg-[#FAF8F5] rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 border border-neutral-200">
              <AppImage
                src={ASSET_IMAGES.brand.charcoalGrill}
                alt="Brasas de carbón vegetal para pollo a la brasa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  Cocción a la leña
                </span>
                <span className="text-xs sm:text-sm font-black font-heading">
                  100% Carbón Vegetal
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-black text-lg text-[#141414]">
                Receta de Tradición
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                El aroma inconfundible del carbón y el calor parejo de nuestras brasas sellan el sabor único.
              </p>
            </div>
          </div>

          {/* Bento Tile 3: 4 Micro Metrics Bento Cells (Span 12) */}
          <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 text-center flex flex-col items-center justify-center space-y-1 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#D62828] flex items-center justify-center mb-1">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#141414]">
                +10 Años
              </span>
              <span className="text-xs text-neutral-600 font-medium">De tradición y sabor</span>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 text-center flex flex-col items-center justify-center space-y-1 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#141414]">
                +25,000
              </span>
              <span className="text-xs text-neutral-600 font-medium">Familias satisfechas</span>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 text-center flex flex-col items-center justify-center space-y-1 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center mb-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#141414]">
                4.8 / 5.0
              </span>
              <span className="text-xs text-neutral-600 font-medium">Calificación Google</span>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-neutral-200/90 text-center flex flex-col items-center justify-center space-y-1 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                <Bike className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#141414]">
                365 Días
              </span>
              <span className="text-xs text-neutral-600 font-medium">Delivery activo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

