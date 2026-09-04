/**
 * Centralized Asset Management for Brasas del Sabor
 * 
 * Provides consistent, high-quality, verified images for all dishes,
 * banners, restaurant views, and avatars.
 * 
 * Structure is prepared to easily point to local assets in `/images/...`
 * while providing reliable remote fallbacks.
 */

export const DEFAULT_FALLBACK_POLLO =
  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80';

export const ASSET_IMAGES = {
  // BRAND & RESTAURANT
  brand: {
    heroStarPollo:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80',
    charcoalGrill:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    kitchenPrep:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    restaurantDining:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
  },

  // PRODUCT SPECIFIC IMAGES
  products: {
    // 1/4 Pollo Clásico
    cuartoPollo: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // 1/4 Pollo + Gaseosa
    cuartoPolloGaseosa: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // 1/2 Pollo Brasa
    medioPollo: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // Pollo Entero Familiar
    polloEntero: [
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // Mega Combo Familiar
    megaComboFamiliar: [
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // Combo Pareja
    comboPareja: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
    ],
    // 1/4 Pollo + Chaufa
    cuartoPolloChaufa: [
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    ],
    // Mostrito Brasa
    mostritoBrasa: [
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // Salchipapa Brasa
    salchipapa: [
      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    ],
    // Chaufa Especial
    chaufaEspecial: [
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    ],
    // Papas Familiares
    papasFamiliares: [
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    ],
    // Gaseosa 1.5L
    gaseosa: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    ],
    // Parrilla Personal
    parrillaPersonal: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80',
    ],
    // Parrilla Familiar Brasas
    parrillaFamiliar: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80',
    ],
    // Dúo Brasa Promo
    duoBrasa: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80',
    ],
    // Ensalada Familiar Especial
    ensaladaFamiliar: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    ],
  },

  // PROMOTIONS & OFFERS BANNERS
  promos: {
    familiarBanner:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80',
    duoBanner:
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80',
    martesJuevesBanner:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80',
    personalBanner:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
    flashMegaCombo:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    flashMiercoles:
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    flashPareja:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
  },

  // VISUAL SHOWCASE GALLERY
  showcase: [
    {
      id: 'show-1',
      title: 'Pollo a la Brasa Entero',
      category: 'Piel dorada y crocante con hierbas andinas',
      image:
        'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
      alt: 'Pollo a la brasa entero dorado y jugoso recién salido de las brasas',
      tag: 'Estrella de la Casa',
    },
    {
      id: 'show-2',
      title: '1/4 de Pollo con Papas',
      category: 'Porción clásica con papas fritas doraditas',
      image:
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
      alt: 'Cuarto de pollo a la brasa con papas fritas crujientes y ensalada',
      tag: 'El Clásico',
    },
    {
      id: 'show-3',
      title: 'Combo Familiar Abundante',
      category: 'Para compartir en familia con papas y cremas',
      image:
        'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      alt: 'Mesa con pollo a la brasa familiar, papas doradas y salsas caseras',
      tag: 'Para la Familia',
    },
    {
      id: 'show-4',
      title: 'Mostrito Brasa',
      category: '1/4 de pollo + Arroz chaufa al wok + Papas',
      image:
        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80',
      alt: 'Mostrito peruano con pollo a la brasa y chaufa al wok humeante',
      tag: 'Favorito Peruano',
    },
    {
      id: 'show-5',
      title: 'Cocción a Fuego de Carbón',
      category: 'Carbón vegetal de algarrobo y calor parejo',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      alt: 'Brasas al rojo vivo y pollos asándose a la leña tradicional',
      tag: '100% Carbón',
    },
    {
      id: 'show-6',
      title: 'Cremas Caseras & Ají Pollero',
      category: 'Recetas artesanales batidas al día',
      image:
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
      alt: 'Cremas artesanales de ají pollero, huacatay y mayonesa',
      tag: 'Sabor Casero',
    },
    {
      id: 'show-7',
      title: '1/2 Pollo Dorado',
      category: 'La porción perfecta para dos personas',
      image:
        'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
      alt: 'Medio pollo a la brasa jugoso con ensalada fresca',
      tag: 'Dúo Perfecto',
    },
    {
      id: 'show-8',
      title: 'Papas Fritas Crujientes',
      category: 'Papas peruanas seleccionadas y doraditas',
      image:
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
      alt: 'Papas fritas recién doradas y crocantes',
      tag: 'Guarnición Estrella',
    },
  ],

  // REVIEW AVATARS
  avatars: {
    carlos:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    maria:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    luis:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    patricia:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    jorge:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80',
  },
};
