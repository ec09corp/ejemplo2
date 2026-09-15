import { CartItem, OrderFormData } from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

/**
 * Formats order details into a clean, legible WhatsApp message
 * conforming to the prompt specification.
 */
export function generateWhatsAppOrderMessage(
  items: CartItem[],
  formData: OrderFormData,
  subtotalUSD: number,
  deliveryFeeUSD: number,
  totalUSD: number,
  orderNumber?: string,
  restaurantName = RESTAURANT_CONFIG.name
): string {
  const typeLabels: Record<string, string> = {
    delivery: '🛵 Delivery a domicilio',
    pickup: '🛍️ Para recoger en restaurante',
    dine_in: '🍽️ Consumo en el restaurante',
  };

  const paymentLabels: Record<string, string> = {
    efectivo: '💵 Efectivo',
    tarjeta: '💳 Tarjeta (POS inalámbrico)',
    yappy_transferencia: '📱 Yappy / Transferencia Bancaria',
  };

  const productLines = items
    .map((item) => {
      const optionsText =
        item.selectedOptions && item.selectedOptions.length > 0
          ? ` (${item.selectedOptions.map((o) => o.optionName).join(', ')})`
          : '';
      const notesText = item.notes ? ` [Nota: ${item.notes}]` : '';
      return `* ${item.name}${optionsText} x${item.quantity} — USD ${(
        item.unitPriceUSD * item.quantity
      ).toFixed(2)}${notesText}`;
    })
    .join('\n');

  let orderDetails = `*PEDIDO ${orderNumber ? orderNumber + ' ' : ''}- ${restaurantName.toUpperCase()}*\n\n`;
  orderDetails += `*Cliente:* ${formData.customerName || 'No especificado'}\n`;
  orderDetails += `*Teléfono:* ${formData.phone || 'No especificado'}\n\n`;

  orderDetails += `*Productos:*\n${productLines}\n\n`;

  orderDetails += `*Subtotal:* USD ${subtotalUSD.toFixed(2)}\n`;
  if (deliveryFeeUSD > 0) {
    orderDetails += `*Envío:* USD ${deliveryFeeUSD.toFixed(2)}\n`;
  }
  orderDetails += `*Total:* USD ${totalUSD.toFixed(2)}\n\n`;

  orderDetails += `*Tipo de pedido:* ${typeLabels[formData.orderType] || formData.orderType}\n`;

  if (formData.orderType === 'delivery') {
    orderDetails += `*Dirección:* ${formData.deliveryAddress || 'Pendiente de coordinar'}\n`;
  } else if (formData.orderType === 'dine_in' && formData.tableNumber) {
    orderDetails += `*Mesa N°:* ${formData.tableNumber}\n`;
  }

  orderDetails += `*Método de pago:* ${
    paymentLabels[formData.paymentMethod] || formData.paymentMethod
  }\n`;

  if (formData.notes && formData.notes.trim()) {
    orderDetails += `*Notas:* ${formData.notes.trim()}\n`;
  }

  orderDetails += `\n_Enviado desde el Menú Digital Oficial de ${restaurantName}_`;

  return orderDetails;
}

/**
 * Returns the full wa.me direct URL with encoded message
 */
export function getWhatsAppOrderUrl(
  items: CartItem[],
  formData: OrderFormData,
  subtotalUSD: number,
  deliveryFeeUSD: number,
  totalUSD: number,
  orderNumber?: string,
  customPhone?: string,
  restaurantName?: string
): string {
  const rawPhone = customPhone || RESTAURANT_CONFIG.contact.whatsappNumber;
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const message = generateWhatsAppOrderMessage(
    items,
    formData,
    subtotalUSD,
    deliveryFeeUSD,
    totalUSD,
    orderNumber,
    restaurantName
  );
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct WhatsApp inquiry chat URL
 */
export function getWhatsAppDirectChatUrl(
  customPhone?: string,
  restaurantName = RESTAURANT_CONFIG.name
): string {
  const rawPhone = customPhone || RESTAURANT_CONFIG.contact.whatsappNumber;
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const greeting = `¡Hola! Me gustaría hacer una consulta sobre el menú de ${restaurantName} 🔥`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}
