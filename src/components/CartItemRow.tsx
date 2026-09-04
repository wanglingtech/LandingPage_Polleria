import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_CONFIG } from '../config';
import { AppImage } from './common/AppImage';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="p-3.5 sm:p-4 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex gap-3 sm:gap-4 items-start">
      {/* Thumbnail */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-neutral-200 flex-shrink-0 border border-neutral-200">
        <AppImage
          src={item.product.images[0] || ''}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-heading font-extrabold text-sm sm:text-base text-neutral-900 leading-snug">
            {item.product.name}
          </h4>
          <button
            onClick={() => onRemove(item.id)}
            aria-label={`Eliminar ${item.product.name}`}
            className="text-neutral-400 hover:text-rose-600 p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer"
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Options Summary */}
        <div className="text-[11px] sm:text-xs text-neutral-500 space-y-0.5">
          {item.selectedOptions.drink && (
            <p className="line-clamp-1">
              <span className="font-semibold text-neutral-700">Bebida:</span>{' '}
              {item.selectedOptions.drink}
            </p>
          )}

          {item.selectedOptions.sauces && item.selectedOptions.sauces.length > 0 && (
            <p className="line-clamp-1">
              <span className="font-semibold text-neutral-700">Cremas:</span>{' '}
              {item.selectedOptions.sauces.join(', ')}
            </p>
          )}

          {item.selectedOptions.extras && item.selectedOptions.extras.length > 0 && (
            <p className="line-clamp-1 text-emerald-700 font-medium">
              <span className="font-semibold">Extras:</span>{' '}
              {item.selectedOptions.extras.map((e) => e.name).join(', ')}
            </p>
          )}

          {item.selectedOptions.specialInstructions && (
            <p className="italic text-neutral-400 line-clamp-1">
              "{item.selectedOptions.specialInstructions}"
            </p>
          )}
        </div>

        {/* Quantity Controls & Subtotal */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-0.5 shadow-sm">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              aria-label="Disminuir cantidad"
              className="p-1 sm:p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 font-bold text-xs sm:text-sm text-neutral-900">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label="Aumentar cantidad"
              className="p-1 sm:p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <span className="font-heading font-black text-sm sm:text-base text-neutral-900 block">
              {RESTAURANT_CONFIG.currencySymbol} {item.totalPrice.toFixed(2)}
            </span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-neutral-400 block">
                ({RESTAURANT_CONFIG.currencySymbol} {item.unitPrice.toFixed(2)} c/u)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
