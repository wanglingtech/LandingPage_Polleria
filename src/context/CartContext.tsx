import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { CartItem, CartItemOption, Product, Coupon, CustomerInfo } from '../types';
import { AVAILABLE_COUPONS, RESTAURANT_CONFIG } from '../config';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  favorites: string[];
  coupon: Coupon | null;
  isCartOpen: boolean;
  customerInfo: CustomerInfo;
  subtotal: number;
  discount: number;
  totalItems: number;
  totalPrice: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, options?: Partial<CartItemOption>, quantity?: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'brasas_cart_v1';
const FAVORITES_STORAGE_KEY = 'brasas_favs_v1';
const COUPON_STORAGE_KEY = 'brasas_coupon_v1';
const CUSTOMER_STORAGE_KEY = 'brasas_customer_v1';

const defaultCustomerInfo: CustomerInfo = {
  name: '',
  phone: '',
  deliveryMethod: 'delivery',
  district: RESTAURANT_CONFIG.district,
  address: '',
  reference: '',
  paymentMethod: 'efectivo',
  cashAmount: '',
  notes: '',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-4', 'prod-8'];
    } catch {
      return ['prod-1', 'prod-4', 'prod-8'];
    }
  });

  const [coupon, setCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? { ...defaultCustomerInfo, ...JSON.parse(saved) } : defaultCustomerInfo;
    } catch {
      return defaultCustomerInfo;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving coupon', e);
    }
  }, [coupon]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.error('Error saving customer info', e);
    }
  }, [customerInfo]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Helper to generate hash from options
  const generateOptionHash = (productId: string, options: CartItemOption): string => {
    const saucesStr = [...(options.sauces || [])].sort().join('|');
    const drinkStr = options.drink || '';
    const extrasStr = [...(options.extras || [])]
      .map((e) => `${e.name}:${e.price}`)
      .sort()
      .join('|');
    const noteStr = (options.specialInstructions || '').trim().toLowerCase();
    return `${productId}__${saucesStr}__${drinkStr}__${extrasStr}__${noteStr}`;
  };

  const addToCart = (
    product: Product,
    customOptions?: Partial<CartItemOption>,
    quantity = 1
  ) => {
    if (!product.available) {
      showToast('Producto no disponible', 'Este producto se encuentra agotado por hoy', 'error');
      return;
    }

    // Default configuration if not customized
    const defaultSauces = product.sauces.slice(0, 3);
    const defaultDrink = product.drinks && product.drinks.length > 0 ? product.drinks[0] : undefined;

    const finalOptions: CartItemOption = {
      sauces: customOptions?.sauces ?? defaultSauces,
      drink: customOptions?.drink !== undefined ? customOptions.drink : defaultDrink,
      extras: customOptions?.extras ?? [],
      specialInstructions: customOptions?.specialInstructions ?? '',
    };

    // Calculate item unit price (base product + extras)
    const extrasTotal = finalOptions.extras.reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = product.price + extrasTotal;
    const totalPrice = unitPrice * quantity;

    const uniqueId = generateOptionHash(product.id, finalOptions);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: updated[existingIndex].unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          product,
          quantity,
          selectedOptions: finalOptions,
          unitPrice,
          totalPrice,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(
      '¡Producto agregado al carrito! 🍗',
      `${quantity}x ${product.name} listo en tu pedido`,
      'cart'
    );
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
    if (item) {
      showToast('Producto eliminado', `${item.product.name} fue quitado del carrito`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const toggleFavorite = (productId: string) => {
    const exists = favorites.includes(productId);
    if (exists) {
      setFavorites((prev) => prev.filter((id) => id !== productId));
      showToast('Eliminado de favoritos', 'Se quitó de tu lista de favoritos', 'info');
    } else {
      setFavorites((prev) => [...prev, productId]);
      showToast('¡Guardado en favoritos! ❤️', 'Podrás encontrarlo en tu filtro de favoritos', 'success');
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
    return (subtotal * coupon.discountPercent) / 100;
  }, [subtotal, coupon]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    const delivery = customerInfo.deliveryMethod === 'pickup' ? 0 : RESTAURANT_CONFIG.deliveryPrice;
    return Math.max(0, subtotal + (cart.length > 0 ? delivery : 0) - discount);
  }, [subtotal, discount, cart.length, customerInfo.deliveryMethod]);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast('Cupón inválido', 'El código ingresado no existe o ha expirado', 'error');
      return { success: false, message: 'El cupón no es válido.' };
    }

    if (found.minSubtotal && subtotal < found.minSubtotal) {
      const msg = `Monto mínimo para este cupón: S/ ${found.minSubtotal.toFixed(2)}`;
      showToast('Cupón no aplicable', msg, 'error');
      return { success: false, message: msg };
    }

    setCoupon(found);
    showToast(
      '¡Cupón aplicado correctamente! 🎉',
      `Obtuviste ${found.discountPercent}% de descuento en tu orden`,
      'coupon'
    );

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }

    return {
      success: true,
      message: `¡Descuento de ${found.discountPercent}% aplicado con éxito!`,
    };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Cupón eliminado', 'El descuento fue retirado', 'info');
  };

  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setCustomerInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        coupon,
        isCartOpen,
        customerInfo,
        subtotal,
        discount,
        totalItems,
        totalPrice,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleFavorite,
        isFavorite,
        applyCoupon,
        removeCoupon,
        updateCustomerInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
