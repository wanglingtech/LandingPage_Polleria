import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, UtensilsCrossed, X, Heart, Sparkles, Flame } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenProductModal: (product: Product) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenProductModal,
  searchInputRef,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'todos' && !showFavoritesOnly) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.includes.some((inc) => inc.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case 'popular':
      default:
        list.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.reviews - a.reviews;
        });
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy, showFavoritesOnly]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section id="carta" className="py-12 bg-[#FAF8F5] border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Search and Controls Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] font-bold text-xs uppercase tracking-wider mb-1.5">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Nuestra Carta Completa</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#141414] tracking-tight">
                Platos & Especialidades a la Brasa 🍗
              </h2>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-xs text-neutral-500 font-bold flex items-center gap-1 flex-shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Ordenar:</span>
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="flex-1 sm:flex-initial text-xs sm:text-sm font-bold bg-[#FAF8F5] border border-neutral-300/80 rounded-2xl px-3.5 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#D62828] cursor-pointer shadow-sm"
              >
                <option value="popular">🔥 Más populares</option>
                <option value="rating">⭐ Mejor valorados</option>
                <option value="price-asc">💵 Precio: menor a mayor</option>
                <option value="price-desc">💰 Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por plato, guarnición o bebida (ej. 1/4 pollo, chaufa, inca kola...)"
              className="w-full bg-[#FAF8F5] border border-neutral-200/90 hover:border-neutral-300 focus:bg-white focus:border-[#D62828] focus:ring-2 focus:ring-red-100 rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-neutral-800 placeholder-neutral-400 shadow-inner transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active status indicator tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {showFavoritesOnly ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                <span>Mostrando Favoritos</span>
                <button
                  onClick={onToggleFavoritesOnly}
                  className="ml-1 text-rose-600 hover:text-rose-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : selectedCategory !== 'todos' ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                <span>Categoría: {activeCategoryObj?.name}</span>
                <button
                  onClick={() => onSelectCategory('todos')}
                  className="ml-1 text-amber-700 hover:text-amber-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {searchQuery && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-200 text-neutral-800 text-xs font-bold border border-neutral-300">
                <span>Búsqueda: "{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 text-neutral-600 hover:text-neutral-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <span className="text-xs text-neutral-500 font-bold w-full sm:w-auto sm:ml-auto pt-1 sm:pt-0 text-left sm:text-right">
              {filteredAndSortedProducts.length}{' '}
              {filteredAndSortedProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}
            </span>
          </div>
        </div>

        {/* Bento Product Cards Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={onOpenProductModal}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-dashed border-neutral-300 max-w-md mx-auto my-8 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-2xl">
              🍗
            </div>
            <h3 className="font-heading font-black text-xl text-[#141414]">
              No encontramos platos coincidentes
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xs mx-auto">
              Intenta con palabras clave como "pollo", "chaufa", "familiar" o restablece los filtros.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  onSearchChange('');
                  onSelectCategory('todos');
                  if (showFavoritesOnly) onToggleFavoritesOnly();
                }}
                className="px-5 py-2.5 bg-[#D62828] text-white rounded-2xl text-xs font-black hover:bg-[#B91C1C] transition-colors cursor-pointer shadow-md"
              >
                Ver toda la carta
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

