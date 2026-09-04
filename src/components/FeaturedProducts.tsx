import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config';

interface FeaturedProductsProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onOpenModal,
}) => {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter top favorites
  const featured = products.filter((p) => p.featured || p.popular).slice(0, 7);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="favoritos" className="py-12 bg-neutral-50 border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Platos Estrella</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#141414] tracking-tight">
              Los favoritos de nuestros clientes ⭐
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Desplazar a la izquierda"
              className="w-10 h-10 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 shadow-sm flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Desplazar a la derecha"
              className="w-10 h-10 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 shadow-sm flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {featured.map((product) => {
            const favorite = isFavorite(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onOpenModal(product)}
                className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    aria-label="Favorito"
                    className={`absolute top-3 right-3 p-2 rounded-2xl backdrop-blur-md transition-all active:scale-90 ${
                      favorite ? 'bg-rose-500 text-white' : 'bg-black/50 text-white hover:bg-black/75'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-[#141414] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-neutral-400 font-normal">({product.reviews})</span>
                    </div>

                    <h3 className="font-heading font-black text-base sm:text-lg text-neutral-900 group-hover:text-[#D62828] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      {product.oldPrice && (
                        <span className="text-[11px] text-neutral-400 line-through block">
                          {RESTAURANT_CONFIG.currencySymbol} {product.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-heading font-black text-lg text-neutral-900">
                        {RESTAURANT_CONFIG.currencySymbol} {product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-4 py-2 bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-black rounded-2xl shadow-md transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Agregar +</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
