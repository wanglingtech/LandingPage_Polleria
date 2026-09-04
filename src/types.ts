export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number; // percentage e.g. 20
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  available: boolean;
  featured?: boolean;
  popular?: boolean;
  badge?: 'OFERTA' | 'NUEVO' | 'POPULAR' | '-20%' | '-15%' | 'RECOMENDADO';
  preparationTime: string; // e.g. '20-30 min'
  serves: string; // e.g. '1 persona', '3-4 personas'
  includes: string[];
  sauces: string[];
  drinks?: string[];
  extras?: ExtraOption[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface CartItemOption {
  sauces: string[];
  drink?: string;
  extras: { name: string; price: number }[];
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item id in cart (product.id + hash of options)
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions: CartItemOption;
  unitPrice: number;
  totalPrice: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSubtotal?: number;
  description: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentMethod = 'efectivo' | 'yape' | 'plin' | 'tarjeta';

export interface CustomerInfo {
  name: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  district: string;
  address: string;
  reference: string;
  paymentMethod: PaymentMethod;
  cashAmount?: string;
  notes?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  price?: number;
  oldPrice?: number;
  discountText?: string;
  image: string;
  ctaText: string;
  targetProductId?: string;
  bgGradient: string;
}

export interface FlashOffer {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  offerPrice: number;
  saving: number;
  discountPercent: number;
  image: string;
  description: string;
  badge: string;
  targetProductId: string;
  expiresInSeconds?: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  dish: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface RestaurantConfig {
  restaurantName: string;
  tagline: string;
  logo: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  address: string;
  district: string;
  city: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  openingHours: {
    days: string;
    hours: string;
  };
  deliveryPrice: number;
  minimumOrder: number;
  currency: string;
  currencySymbol: string;
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    whatsapp: string;
  };
  districtsAvailable: string[];
}
