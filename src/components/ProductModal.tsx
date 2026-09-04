import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
  Flame,
  Clock,
  Users,
  ShoppingBag,
  Heart,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { Product, ExtraOption } from '../types';
import { useCart } from '../context/CartContext';
import { RESTAURANT_CONFIG } from '../config';
import { PRODUCTS } from '../data/products';
import { useScrollLock } from '../hooks/useScrollLock';
import { AppImage } from './common/AppImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSelectRelatedProduct,
}) => {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  // Selected State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string | undefined>(undefined);
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Lock body scroll cleanly while modal is open
  useScrollLock(Boolean(product));

  // Initialize or reset when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      // Default to first 3 sauces
      setSelectedSauces(product.sauces.slice(0, 3));
      // Default to first drink if available
      setSelectedDrink(product.drinks && product.drinks.length > 0 ? product.drinks[0] : undefined);
      setSelectedExtras([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const favorite = isFavorite(product.id);

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.popular)
  ).slice(0, 4);

  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
  ];

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleSauce = (sauce: string) => {
    setSelectedSauces((prev) =>
      prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]
    );
  };

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  // Price calculations
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = product.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        sauces: selectedSauces,
        drink: selectedDrink,
        extras: selectedExtras,
        specialInstructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div
      id="product-detail-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col border border-neutral-100 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white backdrop-blur-md transition-colors cursor-pointer shadow-lg active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content Container */}
        <div className="overflow-y-auto overscroll-contain flex-1 p-3.5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Main 2-Column Grid: 55% Gallery / 45% Info & Customization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            {/* LEFT: 55% Gallery Section */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {/* Main big image preview with controls */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-inner group">
                <AppImage
                  key={selectedImageIndex}
                  src={images[selectedImageIndex] || ''}
                  alt={`${product.name} foto ${selectedImageIndex + 1}`}
                  priority={true}
                  className="w-full h-full object-cover object-center"
                />

                {/* Left/Right arrow controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      aria-label="Foto anterior"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all active:scale-90"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      aria-label="Foto siguiente"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all active:scale-90"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}

                {/* Badges in image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {product.badge && (
                    <span className="bg-[#D62828] text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Favorito"
                  className={`absolute top-3 right-12 sm:right-14 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                    favorite ? 'bg-rose-500 text-white shadow-md' : 'bg-black/60 text-white hover:bg-black/80'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Ver foto ${idx + 1}`}
                      className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#D62828] scale-105 shadow-md ring-2 ring-red-500/20'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <AppImage src={img} alt="" showSkeleton={false} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Informative Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 text-center">
                  <Flame className="w-4 h-4 text-red-500 mx-auto mb-0.5" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 block">Al carbón</span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500">Hecho al momento</span>
                </div>
                <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 text-center">
                  <Clock className="w-4 h-4 text-amber-500 mx-auto mb-0.5" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 block">
                    {product.preparationTime}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500">Tiempo aprox.</span>
                </div>
                <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 text-center">
                  <Users className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 block">{product.serves}</span>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500">Porción ideal</span>
                </div>
              </div>

              {/* What's Included (Incluye) */}
              {product.includes && product.includes.length > 0 && (
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-1.5 mb-2">
                    <Utensils className="w-4 h-4 text-[#D62828]" />
                    <span>Este plato incluye:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-700">
                    {product.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT: 45% Information & Customization Section */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {/* Title, rating & description */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-xs sm:text-sm">{product.rating.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span className="text-[11px] sm:text-xs">{product.reviews} opiniones</span>
                </div>

                <h3
                  id="modal-product-title"
                  className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-neutral-900 leading-tight"
                >
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 mt-1.5">
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#181818]">
                    {RESTAURANT_CONFIG.currencySymbol} {product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs sm:text-sm text-neutral-400 line-through">
                      {RESTAURANT_CONFIG.currencySymbol} {product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Ahorras {product.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Customization 1: Elige tus Cremas */}
              {product.sauces && product.sauces.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="font-heading font-bold text-xs sm:text-sm text-neutral-900">
                      1. Cremas de la casa
                    </label>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">Selecciona las que desees</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {product.sauces.map((sauce) => {
                      const isChecked = selectedSauces.includes(sauce);
                      return (
                        <button
                          type="button"
                          key={sauce}
                          onClick={() => toggleSauce(sauce)}
                          className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold text-left transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-red-50/80 border-[#D62828] text-red-950 shadow-sm'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                              isChecked ? 'bg-[#D62828] border-[#D62828] text-white' : 'border-neutral-300'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className="truncate">{sauce}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customization 2: Elige tu Bebida (if applicable) */}
              {product.drinks && product.drinks.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="font-heading font-bold text-xs sm:text-sm text-neutral-900">
                      2. Bebida incluida
                    </label>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">1 opción</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {product.drinks.map((drink) => {
                      const isSelected = selectedDrink === drink;
                      return (
                        <button
                          type="button"
                          key={drink}
                          onClick={() => setSelectedDrink(drink)}
                          className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-semibold text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-50/90 border-amber-500 text-amber-950 shadow-sm'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border flex-shrink-0 ${
                              isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-neutral-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="truncate">{drink}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customization 3: Extras opcionales */}
              {product.extras && product.extras.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between">
                    <label className="font-heading font-bold text-xs sm:text-sm text-neutral-900">
                      3. Porciones y Extras adicionales
                    </label>
                    <span className="text-[10px] sm:text-[11px] text-neutral-500">Opcional</span>
                  </div>
                  <div className="space-y-1.5">
                    {product.extras.map((extra) => {
                      const isChecked = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          type="button"
                          key={extra.id}
                          onClick={() => toggleExtra(extra)}
                          className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl border text-[11px] sm:text-xs font-medium text-left transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0 ${
                                isChecked
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {isChecked && <Check className="w-2.5 h-2.5" />}
                            </div>
                            <span className="truncate">{extra.name}</span>
                          </div>
                          <span className="font-bold text-neutral-800 flex-shrink-0">
                            +{RESTAURANT_CONFIG.currencySymbol} {extra.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions / Notes */}
              <div className="space-y-1 pt-2 border-t border-neutral-200">
                <label className="font-heading font-bold text-xs text-neutral-700 block">
                  Instrucciones especiales (opcional):
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Ej. Pechuga bien dorada, ají extra, etc."
                  className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Related Products Section (También podría gustarte) */}
          {relatedProducts.length > 0 && (
            <div className="pt-5 border-t border-neutral-200">
              <h4 className="font-heading font-black text-base sm:text-lg text-neutral-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>También te recomendamos</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="group bg-[#FAF8F5] hover:bg-neutral-100 border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 transition-all cursor-pointer hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 mb-1.5">
                      <AppImage
                        src={rel.images[0] || ''}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-neutral-900 line-clamp-1 group-hover:text-[#D62828]">
                        {rel.name}
                      </p>
                      <p className="font-heading font-black text-xs text-[#181818] mt-0.5">
                        {RESTAURANT_CONFIG.currencySymbol} {rel.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STICKY BOTTOM ACTION BAR */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:p-4 z-20 shadow-lg">
          <div className="flex items-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-neutral-300 rounded-2xl p-1 bg-[#FAF8F5] flex-shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
                className="p-1.5 sm:p-2 text-neutral-600 hover:text-black hover:bg-neutral-200 rounded-xl disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-2.5 sm:px-4 font-heading font-black text-sm sm:text-base text-neutral-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
                className="p-1.5 sm:p-2 text-neutral-600 hover:text-black hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to cart CTA */}
            <button
              id="modal-add-to-cart-btn"
              type="button"
              onClick={handleAddToCart}
              disabled={!product.available}
              className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#B91C1C] hover:from-[#E03131] hover:to-[#C92A2A] text-white font-black text-xs sm:text-sm md:text-base shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">
                Agregar — {RESTAURANT_CONFIG.currencySymbol} {totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
