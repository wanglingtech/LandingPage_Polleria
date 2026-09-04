import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { Heart, Sparkles, Flame } from 'lucide-react';

interface CategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  showFavoritesOnly,
  onToggleFavoritesOnly,
}) => {
  const { favorites } = useCart();

  return (
    <section id="categorias" className="py-7 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] font-bold text-xs uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Categorías de la Carta</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#141414] tracking-tight">
              ¿Qué se te antoja hoy? 😋
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Selecciona una categoría para filtrar rápidamente
          </p>
        </div>

        {/* Bento Pills Grid / Horizontal Scroll */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-4 sm:px-0 -mx-4 sm:mx-0 scroll-smooth">
          {/* Favorites Filter Chip */}
          <button
            id="cat-btn-favoritos"
            onClick={onToggleFavoritesOnly}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
              showFavoritesOnly
                ? 'bg-rose-600 text-white shadow-rose-600/30 scale-105 border border-rose-700'
                : 'bg-[#FAF8F5] hover:bg-neutral-100 text-neutral-700 border border-neutral-200/90'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-white text-white' : 'text-rose-500'}`} />
            <span>Mis Favoritos</span>
            {favorites.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  showFavoritesOnly ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {favorites.length}
              </span>
            )}
          </button>

          {/* Standard Categories */}
          {CATEGORIES.map((cat) => {
            const isSelected = !showFavoritesOnly && selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-[#141414] text-amber-400 shadow-lg scale-105 border border-neutral-700'
                    : 'bg-[#FAF8F5] hover:bg-neutral-100 text-neutral-800 border border-neutral-200/90'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

