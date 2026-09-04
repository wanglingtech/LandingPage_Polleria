import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  Bike,
  Store,
  CreditCard,
  Banknote,
  Sparkles,
  Phone,
  User,
  MapPin,
  FileText,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from './CartItemRow';
import { RESTAURANT_CONFIG, AVAILABLE_COUPONS } from '../config';
import { orderService } from '../services/orderService';
import { DeliveryMethod, PaymentMethod } from '../types';
import { useScrollLock } from '../hooks/useScrollLock';

interface CartDrawerProps {
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onExploreMenu }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    totalItems,
    totalPrice,
    coupon,
    applyCoupon,
    removeCoupon,
    customerInfo,
    updateCustomerInfo,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cart' | 'checkout'>('cart');

  // Lock body scroll cleanly while cart drawer is open
  useScrollLock(isCartOpen);

  // Sync ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const isPickup = customerInfo.deliveryMethod === 'pickup';
  const deliveryFee = isPickup ? 0 : RESTAURANT_CONFIG.deliveryPrice;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    setCouponInput(code);
    applyCoupon(code);
  };

  const handleProceedToWhatsApp = () => {
    setValidationError(null);

    // Basic Validation
    if (!customerInfo.name.trim()) {
      setValidationError('Por favor ingresa tu nombre completo.');
      setActiveTab('checkout');
      return;
    }

    if (!customerInfo.phone.trim()) {
      setValidationError('Por favor ingresa tu número de teléfono / WhatsApp.');
      setActiveTab('checkout');
      return;
    }

    if (!isPickup && !customerInfo.address.trim()) {
      setValidationError('Por favor ingresa la dirección de entrega.');
      setActiveTab('checkout');
      return;
    }

    if (customerInfo.paymentMethod === 'efectivo' && customerInfo.cashAmount) {
      const cash = parseFloat(customerInfo.cashAmount);
      if (!isNaN(cash) && cash < totalPrice) {
        setValidationError(
          `El monto con el que pagarás (S/ ${cash.toFixed(2)}) es menor al total del pedido (S/ ${totalPrice.toFixed(2)}).`
        );
        return;
      }
    }

    setIsSubmitting(true);

    const waUrl = orderService.generateWhatsAppUrl(cart, customerInfo, coupon);

    // Open WhatsApp
    window.open(waUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div
      id="cart-drawer-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden overscroll-contain animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-[#141414] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D62828] flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white">
                Tu Pedido de Brasas
              </h3>
              <p className="text-xs text-neutral-400">
                {totalItems} {totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-rose-400 font-bold transition-colors px-2 py-1"
                title="Vaciar carrito"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="p-2 rounded-2xl bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Review Items vs Checkout Info) */}
        {cart.length > 0 && (
          <div className="grid grid-cols-2 p-1.5 bg-[#FAF8F5] border-b border-neutral-200 text-xs font-black">
            <button
              onClick={() => setActiveTab('cart')}
              className={`py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'cart'
                  ? 'bg-white text-[#D62828] shadow-sm border border-neutral-200/80'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              1. Productos ({totalItems})
            </button>
            <button
              onClick={() => setActiveTab('checkout')}
              className={`py-2 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-white text-[#D62828] shadow-sm border border-neutral-200/80'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              2. Datos & Entrega 🛵
            </button>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-6">
          {cart.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
                🍗
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-black text-xl text-neutral-800">
                  Tu carrito está esperando algo delicioso
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-xs mx-auto">
                  Agrega un jugoso pollo a la brasa, un combo familiar o tu porción favorita de papas y chaufa.
                </p>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onExploreMenu();
                }}
                className="px-6 py-3 bg-[#D62828] hover:bg-[#B91C1C] text-white font-extrabold text-sm rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                Explorar carta
              </button>
            </div>
          ) : activeTab === 'cart' ? (
            /* Tab 1: Cart Items & Coupon */
            <div className="space-y-5">
              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/90 space-y-3">
                <div className="flex items-center gap-1.5 font-heading font-bold text-xs text-neutral-800">
                  <Tag className="w-4 h-4 text-[#D62828]" />
                  <span>¿Tienes un cupón de descuento?</span>
                </div>

                {coupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Cupón {coupon.code} ({coupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold px-1.5 py-0.5 rounded hover:bg-rose-50"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Ingresa código (ej. BRASA10)"
                        className="flex-1 text-xs px-3 py-2 bg-white border border-neutral-300 rounded-xl uppercase font-bold focus:border-[#D62828] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                    )}

                    {/* Quick coupon suggestions */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-neutral-400">Prueba:</span>
                      {AVAILABLE_COUPONS.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleQuickCoupon(c.code)}
                          className="text-[10px] bg-neutral-200/80 hover:bg-amber-100 hover:text-amber-900 text-neutral-700 px-2 py-0.5 rounded-md font-bold transition-colors"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Customer Data & Payment Form */
            <div className="space-y-5">
              {validationError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-semibold text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Delivery Method Selector */}
              <div className="space-y-2">
                <label className="font-heading font-bold text-xs text-neutral-800 block">
                  Modalidad de entrega
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateCustomerInfo({ deliveryMethod: 'delivery' })}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      customerInfo.deliveryMethod === 'delivery'
                        ? 'bg-red-50 border-[#D62828] text-red-950 shadow-sm'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Bike className="w-5 h-5 text-[#D62828]" />
                    <span>Delivery a Domicilio</span>
                    <span className="text-[10px] text-neutral-500 font-normal">
                      +{RESTAURANT_CONFIG.currencySymbol} {RESTAURANT_CONFIG.deliveryPrice.toFixed(2)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateCustomerInfo({ deliveryMethod: 'pickup' })}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      customerInfo.deliveryMethod === 'pickup'
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-sm'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Store className="w-5 h-5 text-amber-600" />
                    <span>Recojo en Tienda</span>
                    <span className="text-[10px] text-emerald-600 font-bold">¡Gratis!</span>
                  </button>
                </div>
              </div>

              {/* Customer Info Inputs */}
              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Número de Celular / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                      placeholder="Ej. 999 123 456"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Address & District if Delivery */}
                {!isPickup && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">
                          Distrito
                        </label>
                        <select
                          value={customerInfo.district}
                          onChange={(e) => updateCustomerInfo({ district: e.target.value })}
                          className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none font-medium"
                        >
                          {RESTAURANT_CONFIG.districtsAvailable.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 block mb-1">
                          Referencia
                        </label>
                        <input
                          type="text"
                          value={customerInfo.reference}
                          onChange={(e) => updateCustomerInfo({ reference: e.target.value })}
                          placeholder="Ej. Frente al parque / Dpto 402"
                          className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Dirección exacta de entrega *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <textarea
                          rows={2}
                          value={customerInfo.address}
                          onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                          placeholder="Calle / Av., Número, Urbanización"
                          className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:border-[#D62828] focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Payment Method */}
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <label className="font-heading font-bold text-xs text-neutral-800 block">
                    Método de Pago
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'efectivo', label: 'Efectivo', icon: Banknote },
                      { id: 'yape', label: 'Yape', icon: Sparkles },
                      { id: 'plin', label: 'Plin', icon: Sparkles },
                      { id: 'tarjeta', label: 'Tarjeta POS', icon: CreditCard },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const isSel = customerInfo.paymentMethod === pm.id;
                      return (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() =>
                            updateCustomerInfo({ paymentMethod: pm.id as PaymentMethod })
                          }
                          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                            isSel
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSel ? 'text-amber-400' : 'text-neutral-500'}`} />
                          <span>{pm.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cash Change Input */}
                  {customerInfo.paymentMethod === 'efectivo' && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1 mt-2">
                      <label className="text-xs font-bold text-amber-950 block">
                        ¿Con cuánto pagarás? (Para llevarte el vuelto exacto):
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-600">S/</span>
                        <input
                          type="number"
                          value={customerInfo.cashAmount || ''}
                          onChange={(e) => updateCustomerInfo({ cashAmount: e.target.value })}
                          placeholder={`Ej. ${(Math.ceil(totalPrice / 10) * 10).toFixed(0)}`}
                          className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg focus:outline-none"
                        />
                      </div>
                      {customerInfo.cashAmount &&
                        parseFloat(customerInfo.cashAmount) >= totalPrice && (
                          <p className="text-[11px] font-semibold text-emerald-700 pt-0.5">
                            ✓ Vuelto a recibir:{' '}
                            <span className="font-bold">
                              {RESTAURANT_CONFIG.currencySymbol}{' '}
                              {(parseFloat(customerInfo.cashAmount) - totalPrice).toFixed(2)}
                            </span>
                          </p>
                        )}
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1">
                    Instrucciones o notas adicionales:
                  </label>
                  <input
                    type="text"
                    value={customerInfo.notes || ''}
                    onChange={(e) => updateCustomerInfo({ notes: e.target.value })}
                    placeholder="Ej. Tocar timbre 2 veces, salsas bien selladas, etc."
                    className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary & WhatsApp CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-3 shadow-lg">
            {/* Price Breakdown */}
            <div className="space-y-1 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} productos):</span>
                <span className="font-bold text-neutral-800">
                  {RESTAURANT_CONFIG.currencySymbol} {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  {isPickup ? 'Recojo en local:' : 'Costo de Delivery:'}
                </span>
                <span className="font-bold text-neutral-800">
                  {isPickup ? 'Gratis' : `${RESTAURANT_CONFIG.currencySymbol} ${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Descuento cupón ({coupon?.code}):</span>
                  <span>
                    -{RESTAURANT_CONFIG.currencySymbol} {discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="font-heading font-black text-sm text-neutral-900">
                  TOTAL A PAGAR:
                </span>
                <span className="font-heading font-black text-xl text-[#181818]">
                  {RESTAURANT_CONFIG.currencySymbol} {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Next or Submit Button */}
            {activeTab === 'cart' ? (
              <button
                type="button"
                onClick={() => setActiveTab('checkout')}
                className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Continuar a datos de entrega</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="cart-submit-whatsapp-btn"
                type="button"
                onClick={handleProceedToWhatsApp}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/20 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="text-xl">💬</span>
                <span>Continuar pedido por WhatsApp</span>
              </button>
            )}

            <p className="text-[10px] text-center text-neutral-400">
              Se abrirá WhatsApp con el detalle estructurado de tu pedido para coordinar de inmediato.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
