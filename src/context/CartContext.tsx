import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  CartItem,
  Product,
  OrderType,
  OrderFormData,
  OrderTicket,
  OrderStatus,
} from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedOptions?: CartItem['selectedOptions'],
    notes?: string
  ) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  subtotalUSD: number;
  deliveryFeeUSD: number;
  totalUSD: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedOrderType: OrderType;
  setSelectedOrderType: (type: OrderType) => void;
  orders: OrderTicket[];
  submitOrder: (formData: OrderFormData) => OrderTicket;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearOrdersHistory: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fb_restaurant_cart_v1';
const ORDERS_STORAGE_KEY = 'fb_restaurant_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load orders history (for Kitchen / POS demonstration)
  const [orders, setOrders] = useState<OrderTicket[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed sample order so the Kitchen Display System has initial live tickets to inspect
    return [
      {
        id: 'ord-seed-01',
        orderNumber: '#FB-1082',
        createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
        items: [
          {
            id: 'it-seed-1',
            productId: 'h-01',
            name: 'La Brasa Smash Doble',
            basePriceUSD: 13.50,
            unitPriceUSD: 14.75,
            quantity: 2,
            image:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
            selectedOptions: [
              {
                groupId: 'extras',
                groupTitle: 'Extras',
                optionId: 'ex-2',
                optionName: 'Queso Cheddar Extra',
                priceUSD: 1.25,
              },
            ],
            notes: 'Sin pepinillos por favor',
          },
          {
            id: 'it-seed-2',
            productId: 'be-01',
            name: 'Limonada de Frutos Rojos Ahumados',
            basePriceUSD: 4.50,
            unitPriceUSD: 4.50,
            quantity: 2,
            image:
              'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
            selectedOptions: [],
          },
        ],
        subtotalUSD: 38.50,
        deliveryFeeUSD: 2.50,
        totalUSD: 41.00,
        formData: {
          customerName: 'Carlos Mendoza',
          phone: '+507 6712-3344',
          orderType: 'delivery',
          deliveryAddress: 'Condominio Bella Vista, Apto 12B, Torre 2',
          tableNumber: '',
          paymentMethod: 'yappy_transferencia',
          notes: 'Tocar timbre 12B al llegar',
        },
        status: 'en_cocina',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>('delivery');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedOptions: CartItem['selectedOptions'] = [],
    notes = ''
  ) => {
    const optionsTotal = selectedOptions.reduce((acc, curr) => acc + curr.priceUSD, 0);
    const unitPriceUSD = product.priceUSD + optionsTotal;

    const optionsKey = selectedOptions
      .map((o) => `${o.groupId}:${o.optionId}`)
      .sort()
      .join('|');

    setItems((prev) => {
      // Check if identical configuration already in cart
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === product.id &&
          (i.notes || '') === notes &&
          i.selectedOptions
            .map((o) => `${o.groupId}:${o.optionId}`)
            .sort()
            .join('|') === optionsKey
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        basePriceUSD: product.priceUSD,
        unitPriceUSD,
        quantity,
        image: product.image,
        selectedOptions,
        notes,
      };

      return [...prev, newItem];
    });

    // Briefly pulse cart or open drawer
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotalUSD = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  }, [items]);

  const deliveryFeeUSD = useMemo(() => {
    if (selectedOrderType === 'delivery') {
      return items.length > 0 ? RESTAURANT_CONFIG.delivery.feeUSD : 0;
    }
    return 0;
  }, [selectedOrderType, items.length]);

  const totalUSD = useMemo(() => {
    return subtotalUSD + deliveryFeeUSD;
  }, [subtotalUSD, deliveryFeeUSD]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const submitOrder = (formData: OrderFormData): OrderTicket => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newTicket: OrderTicket = {
      id: `ord-${Date.now()}`,
      orderNumber: `#FB-${randomCode}`,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotalUSD,
      deliveryFeeUSD,
      totalUSD,
      formData: { ...formData },
      status: 'nuevo',
    };

    setOrders((prev) => [newTicket, ...prev]);
    clearCart();

    // Fire festive celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5722', '#ff9800', '#ffd54f', '#f44336'],
      });
    } catch {
      // ignore
    }

    return newTicket;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const clearOrdersHistory = () => {
    setOrders([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotalUSD,
        deliveryFeeUSD,
        totalUSD,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedOrderType,
        setSelectedOrderType,
        orders,
        submitOrder,
        updateOrderStatus,
        clearOrdersHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
