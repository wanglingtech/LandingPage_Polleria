import { RestaurantConfig, Coupon } from './types';

export const RESTAURANT_CONFIG: RestaurantConfig = {
  restaurantName: 'Brasas del Sabor',
  tagline: 'El auténtico sabor del pollo a la brasa peruano',
  logo: '🍗',
  phone: '51999999999',
  phoneDisplay: '+51 999 999 999',
  whatsappNumber: '51999999999',
  address: 'Av. Las Brasas 1234, Urb. Los Laureles',
  district: 'Miraflores',
  city: 'Lima, Perú',
  googleMapsUrl: 'https://maps.google.com/?q=Lima+Peru',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.378772091484!2d-77.03276472428615!3d-12.120489988122396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8191986422d%3A0xb3bf8b12204c35e8!2sParque%20Kennedy!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe',
  openingHours: {
    days: 'Lunes a Domingo',
    hours: '12:00 p.m. - 11:00 p.m.',
  },
  deliveryPrice: 5.0,
  minimumOrder: 20.0,
  currency: 'PEN',
  currencySymbol: 'S/',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    whatsapp: 'https://wa.me/51999999999',
  },
  districtsAvailable: [
    'Miraflores',
    'San Isidro',
    'Surco',
    'Barranco',
    'San Borja',
    'Jesús María',
    'Lince',
    'Magdalena',
    'Pueblo Libre',
    'Surquillo',
    'La Molina',
  ],
};

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'BRASA10',
    discountPercent: 10,
    minSubtotal: 30,
    description: '10% de descuento en pedidos mayores a S/ 30.00',
  },
  {
    code: 'FAMILIA15',
    discountPercent: 15,
    minSubtotal: 60,
    description: '15% de descuento en combos familiares',
  },
  {
    code: 'PRIMERPEDIDO',
    discountPercent: 20,
    minSubtotal: 40,
    description: '20% de descuento de bienvenida en tu primera compra',
  },
];
