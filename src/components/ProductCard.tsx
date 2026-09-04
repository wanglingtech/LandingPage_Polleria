import React, { useState } from 'react';
import { Star, Plus, Eye, Heart, Flame, Clock } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config';
import { AppImage } from './common/AppImage';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const favorite = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.available) return;

    setIsAdding(true);
    addToCart(product);

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'POPULAR':
        return 'bg-amber-400 text-neutral-950 font-black';
      case 'OFERTA':
      case '-20%':
      case '-15%':
        return 'bg-[#D62828] text-white font-black';
      case 'NUEVO':
        return 'bg-emerald-600 text-white font-bold';
      case 'RECOMENDADO':
        return 'bg-[#F77F00] text-white font-black';
      default:
        return 'bg-[#141414] text-white font-bold';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onOpenModal(product)}
      className="group relative bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <AppImage
          src={product.images[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient shadow for text & buttons legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {/* Badges Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span
              className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-md ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
          {!product.available && (
            <span className="bg-neutral-900/90 text-neutral-300 text-[11px] font-bold px-2 py-0.5 rounded-lg">
              Agotado
            </span>
          )}
        </div>

        {/* Favorite Button Right */}
        <button
          onClick={handleHeartClick}
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute top-3 right-3 p-2 rounded-2xl backdrop-blur-md transition-transform active:scale-90 z-10 ${
            favorite
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/40 hover:bg-black/70 text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>

        {/* Prep Time pill */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white/95 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-xl flex items-center gap-1 border border-white/10">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{product.preparationTime}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>({product.reviews} opiniones)</span>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#141414] group-hover:text-[#D62828] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          {/* Price display */}
          <div>
            {product.oldPrice && (
              <span className="text-xs text-neutral-400 line-through block">
                {RESTAURANT_CONFIG.currencySymbol} {product.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="font-heading font-black text-lg sm:text-xl text-[#141414]">
              {RESTAURANT_CONFIG.currencySymbol} {product.price.toFixed(2)}
            </span>
          </div>

          {/* Buttons: Ver detalle & Quick Add */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(product);
              }}
              aria-label="Ver detalle"
              className="p-2 sm:px-3 sm:py-2 min-w-[36px] min-h-[36px] text-neutral-800 bg-[#FAF8F5] hover:bg-neutral-200 border border-neutral-200/90 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Detalle</span>
            </button>

            {product.available ? (
              <button
                type="button"
                onClick={handleQuickAdd}
                aria-label={`Agregar ${product.name} al carrito`}
                disabled={isAdding}
                className={`p-2 sm:px-3.5 sm:py-2 min-w-[36px] min-h-[36px] rounded-2xl text-xs font-black transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer ${
                  isAdding
                    ? 'bg-emerald-600 text-white scale-95'
                    : 'bg-[#D62828] hover:bg-[#B91C1C] text-white hover:scale-105 active:scale-95 shadow-red-950/20'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Agregar</span>
              </button>
            ) : (
              <span className="text-[11px] font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1.5 rounded-2xl">
                Agotado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

