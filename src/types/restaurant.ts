export type CategoryId =
  | 'hamburguesas'
  | 'alitas'
  | 'combos'
  | 'entradas'
  | 'principales'
  | 'bebidas'
  | 'postres'
  | 'promociones';

export interface ProductCategory {
  id: CategoryId;
  name: string;
  iconName: string;
  badge?: string;
  description: string;
}

export interface ProductOption {
  id: string;
  name: string;
  priceUSD: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  required: boolean;
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  categoryId: CategoryId;
  image: string;
  badge?: 'Más Vendido' | 'Picante' | 'Nuevo' | 'Especial Chef' | 'Combo Estrella';
  isAvailable: boolean;
  prepTimeMinutes?: number;
  calories?: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  customizationGroups?: CustomizationGroup[];
}

export interface Promotion {
  id: string;
  title: string;
  badge: string;
  description: string;
  originalPriceUSD: number;
  promoPriceUSD: number;
  image: string;
  includes: string[];
  expiresTag?: string;
  productIdReference?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  basePriceUSD: number;
  unitPriceUSD: number;
  quantity: number;
  image: string;
  selectedOptions: {
    groupId: string;
    groupTitle: string;
    optionId: string;
    optionName: string;
    priceUSD: number;
  }[];
  notes?: string;
}

export type OrderType = 'delivery' | 'pickup' | 'dine_in';
export type PaymentMethod = 'efectivo' | 'tarjeta' | 'yappy_transferencia';

export interface OrderFormData {
  customerName: string;
  phone: string;
  orderType: OrderType;
  deliveryAddress: string;
  tableNumber: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export type OrderStatus = 'nuevo' | 'en_cocina' | 'listo' | 'entregado' | 'cancelado';

export interface OrderTicket {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotalUSD: number;
  deliveryFeeUSD: number;
  totalUSD: number;
  formData: OrderFormData;
  status: OrderStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'platos' | 'ambiente' | 'cocina';
  image: string;
  description: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  subtitle: string;
  brandStory: {
    headline: string;
    history: string;
    philosophy: string;
    culinaryPromise: string;
    image: string;
    highlights: { title: string; desc: string; icon: string }[];
  };
  contact: {
    whatsappNumber: string; // e.g. "+50761234567"
    whatsappDisplay: string;
    phone: string;
    address: string;
    addressNotes: string;
    googleMapsEmbedUrl?: string;
    googleMapsLink: string;
  };
  schedule: {
    weekdays: string;
    weekends: string;
    isOpenNowText: string;
  };
  delivery: {
    feeUSD: number;
    estimatedMinutes: string;
    minimumOrderUSD: number;
  };
  social: SocialLinks;
}
