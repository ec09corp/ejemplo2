import {
  ProductCategory,
  Product,
  Promotion,
  RestaurantConfig,
  GalleryItem,
} from '../types/restaurant';

/* ==========================================================================
   CONFIGURACIÓN GENERAL DEL RESTAURANTE
   Modifica aquí los datos clave de tu negocio (Nombre, WhatsApp, Dirección, etc.)
   ========================================================================== */

export const RESTAURANT_CONFIG: RestaurantConfig = {
  // Nombre de la marca (cámbialo aquí para actualizarlo en todo el sitio web)
  name: 'FUEGO & BRASA',
  tagline: 'Smokery, Craft Burgers & Urban Grill',
  subtitle: 'Carne Angus seleccionada, ahumados lentos a la leña de roble y salsas artesanales de autor.',

  // Historia y concepto sobre nosotros
  brandStory: {
    headline: 'Nacidos de la pasión por las brasas vivas y el buen comer',
    history:
      'FUEGO & BRASA nació como un taller culinario clandestino donde experimentábamos con leñas de roble, cortes seleccionados y técnicas de ahumado tejano fusionadas con sabores urbanos e intensos.',
    philosophy:
      'Creemos que una hamburguesa no es comida rápida: es alta cocina entre panes brioche. Cada medallón es molido a diario, sellado a fuego abrasador para lograr la costra Maillard perfecta y bañado en mantequilla infusionada.',
    culinaryPromise:
      'Cero congelados industriales. Pan artesanal horneado cada mañana. 100% Carne Black Angus certificada y ahumados de hasta 14 horas de cocción.',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      {
        title: 'Ahumado Lento 14h',
        desc: 'Madera de roble y quebracho rojo para notas profundas.',
        icon: 'Flame',
      },
      {
        title: 'Pan Brioche Dorado',
        desc: 'Receta propia con mantequilla francesa horneada al alba.',
        icon: 'Sparkles',
      },
      {
        title: 'Salsas Secretas',
        desc: 'Elaboradas desde cero: BBQ Bourbon, Mayo Trufada y Salsa Fuego.',
        icon: 'Utensils',
      },
      {
        title: 'Despacho Veloz',
        desc: 'Empaque térmico que mantiene el crujiente hasta tu mesa.',
        icon: 'Truck',
      },
    ],
  },

  // Datos de contacto y ubicación
  contact: {
    /* ⚠️ IMPORTANTE - CONFIGURACIÓN DE WHATSAPP:
       Coloca tu número oficial de WhatsApp con código de país SIN espacios ni signos +.
       Ejemplo para Panamá (+507 6123-4567): "50761234567"
       Ejemplo para México (+52 1 55 1234-5678): "5215512345678"
    */
    whatsappNumber: '50769998877', // REEMPLAZAR CON TU NÚMERO REAL
    whatsappDisplay: '+507 6999-8877',
    phone: '+507 223-4589',
    address: 'Calle 50, Plaza Gastronómica Las Terrazas, Local 4B',
    addressNotes: 'Estacionamiento privado gratuito y terraza al aire libre',
    googleMapsLink: 'https://maps.google.com/?q=Calle+50+Ciudad+de+Panama',
  },

  // Horarios de atención
  schedule: {
    weekdays: 'Lunes a Jueves: 12:00 PM – 10:30 PM',
    weekends: 'Viernes a Domingo: 12:00 PM – 11:30 PM',
    isOpenNowText: 'Abierto Ahora • Recibiendo pedidos de Delivery & Salón',
  },

  // Parámetros de entrega
  delivery: {
    feeUSD: 2.50,
    estimatedMinutes: '30 - 45 min',
    minimumOrderUSD: 10.00,
  },

  // Enlaces de redes sociales
  social: {
    instagram: 'https://instagram.com/fuegoybrasa.rest',
    facebook: 'https://facebook.com/fuegoybrasa.rest',
    tiktok: 'https://tiktok.com/@fuegoybrasa.rest',
    whatsapp: 'https://wa.me/50769998877',
  },
};

/* ==========================================================================
   CATEGORÍAS DEL MENÚ
   ========================================================================== */

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    iconName: 'Flame',
    badge: 'Estrellas',
    description: 'Smash y medallones Angus jugosos con queso fundido y pan brioche.',
  },
  {
    id: 'alitas',
    name: 'Alitas & Tenders',
    iconName: 'Sparkles',
    badge: 'Crujientes',
    description: 'Bañadas al momento en nuestras 6 salsas artesanales.',
  },
  {
    id: 'combos',
    name: 'Combos & Boxes',
    iconName: 'Gift',
    badge: 'Ahorro',
    description: 'Completos con papas rústicas y bebidas heladas.',
  },
  {
    id: 'entradas',
    name: 'Entradas & Papas',
    iconName: 'UtensilsCrossed',
    description: 'Papas cargadas, aros crujientes y tequeños gourmet.',
  },
  {
    id: 'principales',
    name: 'Parrilla & Cortes',
    iconName: 'Beef',
    description: 'Costillitas BBQ ahumadas, pulled pork y cortes a la brasa.',
  },
  {
    id: 'bebidas',
    name: 'Bebidas & Cócteles',
    iconName: 'Beer',
    description: 'Limonadas refrescantes, sodas artesanales y cervezas tiradas.',
  },
  {
    id: 'postres',
    name: 'Postres Monstruosos',
    iconName: 'CakeSlice',
    description: 'El toque dulce irresistible recién horneado.',
  },
  {
    id: 'promociones',
    name: 'Promociones',
    iconName: 'Tag',
    badge: 'Top Ofertas',
    description: 'Precios especiales por tiempo limitado.',
  },
];

/* ==========================================================================
   PRODUCTOS DEL MENÚ (Edita, agrega o quita platillos aquí fácilmente)
   ========================================================================== */

export const PRODUCTS: Product[] = [
  // --- HAMBURGUESAS ---
  {
    id: 'h-01',
    name: 'La Brasa Smash Doble',
    description:
      'Doble carne Black Angus 100g smash crispy, queso cheddar americano fundido, mermelada de tocineta ahumada con miel de maple y salsa Fuego secreta en pan brioche artesanal.',
    priceUSD: 13.50,
    categoryId: 'hamburguesas',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    isAvailable: true,
    prepTimeMinutes: 18,
    calories: '890 kcal',
    spicyLevel: 1,
    customizationGroups: [
      {
        id: 'coccion',
        title: 'Término de la carne',
        required: true,
        options: [
          { id: 'c-1', name: 'Smash Costra Crujiente (Estilo de la casa)', priceUSD: 0 },
          { id: 'c-2', name: 'Bien Cocido', priceUSD: 0 },
        ],
      },
      {
        id: 'extras',
        title: 'Extras apetitosos',
        required: false,
        options: [
          { id: 'ex-1', name: 'Doble Tocineta Ahumada', priceUSD: 1.75 },
          { id: 'ex-2', name: 'Queso Cheddar Extra', priceUSD: 1.25 },
          { id: 'ex-3', name: 'Huevo frito con yema blanda', priceUSD: 1.00 },
          { id: 'ex-4', name: 'Cebolla caramelizada al bourbon', priceUSD: 1.20 },
        ],
      },
    ],
  },
  {
    id: 'h-02',
    name: 'Smoked Truffle & Portobello',
    description:
      'Medallón grueso de Angus 200g a la parrilla, hongos portobello salteados al romero, queso suizo fundido, cebolla crispy y alioli suave de trufa negra.',
    priceUSD: 15.90,
    categoryId: 'hamburguesas',
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    badge: 'Especial Chef',
    isAvailable: true,
    prepTimeMinutes: 20,
    calories: '940 kcal',
    customizationGroups: [
      {
        id: 'extras',
        title: 'Extras',
        required: false,
        options: [
          { id: 'tr-1', name: 'Extra salsa de trufa', priceUSD: 1.50 },
          { id: 'tr-2', name: 'Pepinillos agridulces artesanales', priceUSD: 0.75 },
        ],
      },
    ],
  },
  {
    id: 'h-03',
    name: 'Volcán Habanero & Bacon',
    description:
      'Doble smash burger, queso pepper jack fundido, tocineta glaseada en chipotle, jalapeños encurtidos al carbón y mayo de habanero tostado.',
    priceUSD: 14.25,
    categoryId: 'hamburguesas',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badge: 'Picante',
    isAvailable: true,
    prepTimeMinutes: 18,
    calories: '910 kcal',
    spicyLevel: 3,
  },
  {
    id: 'h-04',
    name: 'La Clásica Criolla & Guacamole',
    description:
      'Carne de res 180g sazonada con especias locales, abundante guacamole rústico hecho al momento, pico de gallo fresco, queso gouda y mayonesa de cilantro.',
    priceUSD: 12.95,
    categoryId: 'hamburguesas',
    image:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 15,
    calories: '820 kcal',
  },

  // --- ALITAS & TENDERS ---
  {
    id: 'al-01',
    name: 'Alitas Ahumadas & Glaseadas BBQ Bourbon (10 pcs)',
    description:
      'Ahumadas lentamente con leña de roble, fritas al punto crujiente y bañadas en nuestra salsa insignia de BBQ al bourbon y azúcar de caña. Acompañadas de dip ranch casero.',
    priceUSD: 12.50,
    categoryId: 'alitas',
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    isAvailable: true,
    prepTimeMinutes: 15,
    customizationGroups: [
      {
        id: 'salsa',
        title: 'Salsa Principal',
        required: true,
        options: [
          { id: 's-bbq', name: 'BBQ Bourbon Ahumado', priceUSD: 0 },
          { id: 's-buf', name: 'Buffalo Clásica Picante', priceUSD: 0 },
          { id: 's-man', name: 'Mango Habanero Glaze', priceUSD: 0 },
          { id: 's-gar', name: 'Parmesano & Ajo Asado', priceUSD: 0 },
        ],
      },
      {
        id: 'dip',
        title: 'Dip Acompañante',
        required: true,
        options: [
          { id: 'd-ran', name: 'Ranch de Eneldo Fresco', priceUSD: 0 },
          { id: 'd-blu', name: 'Blue Cheese Auténtico', priceUSD: 0.50 },
        ],
      },
    ],
  },
  {
    id: 'al-02',
    name: 'Mega Alitas Fuego Infierno (16 pcs)',
    description:
      'Para valientes: 16 alitas jumbo con nuestra reducción de habaneros asados, chile de árbol y un toque dulce de mango criollo. Servidas con bastones de apio y zanahoria.',
    priceUSD: 18.75,
    categoryId: 'alitas',
    image:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    badge: 'Picante',
    isAvailable: true,
    prepTimeMinutes: 20,
    spicyLevel: 3,
  },
  {
    id: 'al-03',
    name: 'Crispy Chicken Tenders Artesanales',
    description:
      '6 filetes jugosos de pechuga empanizados en panko especiado extra crujiente. Incluye 2 salsas a elección y papas fritas corte fino.',
    priceUSD: 11.90,
    categoryId: 'alitas',
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 14,
  },

  // --- COMBOS ---
  {
    id: 'cb-01',
    name: 'Combo Pareja: 2 Burgers + Papas XL + Bebidas',
    description:
      '2 Hamburguesas "La Brasa Smash Doble" con doble carne Angus + 1 Porción de Papas Rústicas con Queso Cheddar fundido y Tocineta + 2 Bebidas a elección.',
    priceUSD: 25.99,
    categoryId: 'combos',
    image:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    badge: 'Combo Estrella',
    isAvailable: true,
    prepTimeMinutes: 22,
    customizationGroups: [
      {
        id: 'bebidas_combo',
        title: 'Elige las 2 bebidas',
        required: true,
        options: [
          { id: 'b-col', name: '2x Coca-Cola Sabor Original', priceUSD: 0 },
          { id: 'b-zer', name: '2x Coca-Cola Zero Azúcar', priceUSD: 0 },
          { id: 'b-lim', name: '2x Limonada Menta Jengibre', priceUSD: 1.50 },
        ],
      },
    ],
  },
  {
    id: 'cb-02',
    name: 'Box Cuarteto de Amigos (4 Burgers + Alitas)',
    description:
      '4 Hamburguesas clásicas con queso + 12 alitas BBQ ahumadas + Mega balde de papas sazonadas + 4 salsas de la casa. Ideal para reuniones y partidos.',
    priceUSD: 44.50,
    categoryId: 'combos',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    isAvailable: true,
    prepTimeMinutes: 30,
  },
  {
    id: 'cb-03',
    name: 'Combo Personal Smash & Beer',
    description:
      '1 Smash Burger Doble + Papas finas con paprika + 1 Cerveza Artesanal IPA o Cerveza Nacional helada.',
    priceUSD: 15.50,
    categoryId: 'combos',
    image:
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 15,
  },

  // --- ENTRADAS ---
  {
    id: 'en-01',
    name: 'Papas Volcán Loaded con Pulled Pork',
    description:
      'Papas rústicas doradas bañadas en queso cheddar líquido artesanal, bondiola ahumada 12 horas desmechada con BBQ, jalapeños y cebollina fresca.',
    priceUSD: 9.75,
    categoryId: 'entradas',
    image:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    isAvailable: true,
    prepTimeMinutes: 12,
  },
  {
    id: 'en-02',
    name: 'Tequeños de Queso Blanco & Guayaba (6 pcs)',
    description:
      'Masa crujiente y dorada rellena de queso semiduro fundido con toque dulce de salsa tártara de ajo confitado y reducción de guayaba.',
    priceUSD: 7.50,
    categoryId: 'entradas',
    image:
      'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 10,
  },
  {
    id: 'en-03',
    name: 'Aros de Cebolla al Tempura de Cerveza',
    description:
      'Aros gigantes crujientes marinados en cerveza negra y especias sureñas. Servidos con mayonesa de pimentón ahumado.',
    priceUSD: 6.90,
    categoryId: 'entradas',
    image:
      'https://images.unsplash.com/photo-1639024471285-0afc3834524c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 10,
  },

  // --- PLATOS PRINCIPALES / PARRILLA ---
  {
    id: 'pr-01',
    name: 'Costillar Ahumado St. Louis BBQ Ribs',
    description:
      'Medio costillar de cerdo premium adobado en seco y glaseado con miel de caña y whiskey. Se desprende del hueso solo con mirarlo. Incluye coleslaw y papas rústicas.',
    priceUSD: 19.80,
    categoryId: 'principales',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'Especial Chef',
    isAvailable: true,
    prepTimeMinutes: 25,
  },
  {
    id: 'pr-02',
    name: 'Picaña a las Brasas (350g Angus)',
    description:
      'Corte noble sellado a fuego vivo con sal marina en escamas, chimichurri artesanal de la casa, yuca al mojo y ensalada verde.',
    priceUSD: 22.50,
    categoryId: 'principales',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 24,
  },

  // --- BEBIDAS ---
  {
    id: 'be-01',
    name: 'Limonada de Frutos Rojos Ahumados',
    description:
      'Limones criollos recién exprimidos, infusión fría de frambuesas y moras con jarabe de romero fresco y hielo picado.',
    priceUSD: 4.50,
    categoryId: 'bebidas',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo',
    isAvailable: true,
  },
  {
    id: 'be-02',
    name: 'Soda Artesanal de Maracuyá & Albahaca',
    description:
      'Pulpa fresca de maracuyá concentrada, hojas de albahaca fresca machacadas y agua carbonatada fina.',
    priceUSD: 4.25,
    categoryId: 'bebidas',
    image:
      'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },
  {
    id: 'be-03',
    name: 'Cerveza de Grifo Artesanal IPA (Pinta)',
    description:
      'Cerveza tirada localmente con lúpulos cítricos y tropicales bien balanceados. Servida en vaso helado a -2°C.',
    priceUSD: 6.00,
    categoryId: 'bebidas',
    image:
      'https://images.unsplash.com/photo-1608270116805-4f36c5d1eb56?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
  },

  // --- POSTRES ---
  {
    id: 'po-01',
    name: 'Volcán Choco-Avellana con Helado de Vainilla',
    description:
      'Bizcocho tibio de chocolate amargo con centro líquido de avellana derretida, crumble crocante de almendras y bola de helado de vainilla bourbon.',
    priceUSD: 7.50,
    categoryId: 'postres',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    isAvailable: true,
    prepTimeMinutes: 12,
  },
  {
    id: 'po-02',
    name: 'Churros Rellenos de Dulce de Leche & Nutella',
    description:
      '4 churros recién fritos rebozados en canela y azúcar morena, con dos jeringas de dulce de leche casero y chocolate.',
    priceUSD: 6.75,
    categoryId: 'postres',
    image:
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    prepTimeMinutes: 10,
  },
];

/* ==========================================================================
   PROMOCIONES ESPECIALES (Con precios tachados y descuentos visuales)
   ========================================================================== */

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-01',
    title: 'Viernes de Smash Fest: 2x1 en Doble Burger',
    badge: '¡Ahorras 40%!',
    description:
      'Llévate 2 Hamburguesas "La Brasa Smash Doble" por precio especial de temporada. No incluye papas.',
    originalPriceUSD: 27.00,
    promoPriceUSD: 16.99,
    image:
      'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=800&q=80',
    includes: [
      '2x La Brasa Smash Doble Angus 200g',
      'Queso cheddar americano derretido',
      'Mermelada de bacon ahumado',
    ],
    expiresTag: 'Válido hoy de 5:00 PM a 10:00 PM',
    productIdReference: 'h-01',
  },
  {
    id: 'promo-02',
    title: 'Ribs & Beer Night: Costillar Completo + 2 Pintas',
    badge: 'Favorito Parejas',
    description:
      'Costillar St. Louis glaseado con whiskey + Papas rústicas cargadas + 2 Pintas de cerveza artesanal tirada.',
    originalPriceUSD: 33.50,
    promoPriceUSD: 24.50,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    includes: [
      '1x Costillar completo St. Louis BBQ',
      '1x Papas rústicas con sazón especial',
      '2x Cervezas artesanales heladas',
    ],
    expiresTag: 'Disponible toda la semana',
    productIdReference: 'pr-01',
  },
  {
    id: 'promo-03',
    title: 'Wings & Fries Bucket: 20 Alitas + Papas Grandes',
    badge: 'Promo Grupo',
    description:
      'Balde de 20 alitas crujientes con hasta 3 salsas combinadas + canasta de papas fritas con dip doble.',
    originalPriceUSD: 28.00,
    promoPriceUSD: 20.00,
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    includes: [
      '20x Alitas de pollo a elección',
      'Papas fritas sazonadas corte rústico',
      'Dip Ranch + Salsa BBQ Bourbon',
    ],
    expiresTag: 'Edición limitada',
    productIdReference: 'al-01',
  },
];

/* ==========================================================================
   GALERÍA DE FOTOS (Ambiente, Cocina y Platillos para Lightbox)
   ========================================================================== */

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Cocción a Fuego Vivo',
    category: 'cocina',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    description: 'Nuestra parrilla abierta a leña donde sellamos cada corte con fuego intenso.',
  },
  {
    id: 'gal-2',
    title: 'La Brasa Smash en Preparación',
    category: 'platos',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    description: 'Carne Angus prensada sobre plancha de hierro fundido a más de 300°C.',
  },
  {
    id: 'gal-3',
    title: 'Ambiente Urbano & Terraza Nocturna',
    category: 'ambiente',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: 'Nuestra terraza iluminada con buena música, cócteles y ambiente cálido.',
  },
  {
    id: 'gal-4',
    title: 'Alitas Glaseadas al Bourbon',
    category: 'platos',
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80',
    description: 'Glaseado brillante y crocante perfecto recién salidas del wok.',
  },
  {
    id: 'gal-5',
    title: 'Barra de Cervezas Tiradas & Coctelería',
    category: 'ambiente',
    image:
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=80',
    description: 'Grifos helados con cervezas artesanales y mezclas de autor.',
  },
  {
    id: 'gal-6',
    title: 'Corte de Picaña con Chimichurri',
    category: 'platos',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80',
    description: 'Término medio perfecto con jugo abundante y corte tierno.',
  },
];
