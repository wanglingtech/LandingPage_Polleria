import { CartItem, CustomerInfo, Coupon } from '../types';
import { RESTAURANT_CONFIG } from '../config';

export const orderService = {
  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  },

  calculateDiscount(subtotal: number, coupon: Coupon | null): number {
    if (!coupon) return 0;
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
    return (subtotal * coupon.discountPercent) / 100;
  },

  calculateTotal(
    subtotal: number,
    deliveryFee: number,
    discount: number,
    isPickup = false
  ): number {
    const delivery = isPickup ? 0 : deliveryFee;
    return Math.max(0, subtotal + delivery - discount);
  },

  formatWhatsAppMessage(
    items: CartItem[],
    customer: CustomerInfo,
    coupon: Coupon | null
  ): string {
    const subtotal = this.calculateSubtotal(items);
    const isPickup = customer.deliveryMethod === 'pickup';
    const delivery = isPickup ? 0 : RESTAURANT_CONFIG.deliveryPrice;
    const discount = this.calculateDiscount(subtotal, coupon);
    const total = this.calculateTotal(subtotal, delivery, discount, isPickup);

    const paymentLabels: Record<string, string> = {
      efectivo: 'Efectivo',
      yape: 'Yape',
      plin: 'Plin',
      tarjeta: 'Tarjeta (POS contra entrega)',
    };

    let msg = `Hola 👋 *${RESTAURANT_CONFIG.restaurantName}*.\n\n`;
    msg += `Quisiera realizar el siguiente pedido:\n\n`;

    items.forEach((item, index) => {
      msg += `🍗 *${item.quantity}x ${item.product.name}*\n`;
      msg += `   ${RESTAURANT_CONFIG.currencySymbol} ${item.totalPrice.toFixed(2)} (${RESTAURANT_CONFIG.currencySymbol} ${item.unitPrice.toFixed(2)} c/u)\n`;

      if (item.selectedOptions.sauces && item.selectedOptions.sauces.length > 0) {
        msg += `   🧂 *Cremas:* ${item.selectedOptions.sauces.join(', ')}\n`;
      }

      if (item.selectedOptions.drink) {
        msg += `   🥤 *Bebida:* ${item.selectedOptions.drink}\n`;
      }

      if (item.selectedOptions.extras && item.selectedOptions.extras.length > 0) {
        msg += `   ➕ *Extras:*\n`;
        item.selectedOptions.extras.forEach((ext) => {
          msg += `      • ${ext.name} (+${RESTAURANT_CONFIG.currencySymbol} ${ext.price.toFixed(2)})\n`;
        });
      }

      if (item.selectedOptions.specialInstructions) {
        msg += `   📝 *Nota:* ${item.selectedOptions.specialInstructions}\n`;
      }

      if (index < items.length - 1) {
        msg += `\n`;
      }
    });

    msg += `\n--------------------------------\n`;
    msg += `📊 *Subtotal:* ${RESTAURANT_CONFIG.currencySymbol} ${subtotal.toFixed(2)}\n`;
    
    if (isPickup) {
      msg += `🏪 *Entrega:* Recojo en tienda (${RESTAURANT_CONFIG.currencySymbol} 0.00)\n`;
    } else {
      msg += `🛵 *Delivery:* ${RESTAURANT_CONFIG.currencySymbol} ${delivery.toFixed(2)}\n`;
    }

    if (discount > 0 && coupon) {
      msg += `🎉 *Descuento (${coupon.code}):* -${RESTAURANT_CONFIG.currencySymbol} ${discount.toFixed(2)}\n`;
    }

    msg += `💰 *TOTAL A PAGAR:* ${RESTAURANT_CONFIG.currencySymbol} ${total.toFixed(2)}\n\n`;
    msg += `--------------------------------\n`;
    msg += `👤 *DATOS DEL CLIENTE:*\n`;
    msg += `• *Nombre:* ${customer.name || 'No especificado'}\n`;
    msg += `• *Teléfono:* ${customer.phone || 'No especificado'}\n`;
    
    if (isPickup) {
      msg += `• *Modalidad:* Recojo en tienda (${RESTAURANT_CONFIG.address})\n`;
    } else {
      msg += `• *Distrito:* ${customer.district || RESTAURANT_CONFIG.district}\n`;
      msg += `• *Dirección:* ${customer.address || 'No especificada'}\n`;
      if (customer.reference) {
        msg += `• *Referencia:* ${customer.reference}\n`;
      }
    }

    msg += `\n💵 *Método de Pago:* ${paymentLabels[customer.paymentMethod] || customer.paymentMethod}\n`;
    
    if (customer.paymentMethod === 'efectivo' && customer.cashAmount) {
      const cash = parseFloat(customer.cashAmount);
      if (!isNaN(cash) && cash >= total) {
        const change = cash - total;
        msg += `• *Paga con:* ${RESTAURANT_CONFIG.currencySymbol} ${cash.toFixed(2)}\n`;
        msg += `• *Vuelto estimado:* ${RESTAURANT_CONFIG.currencySymbol} ${change.toFixed(2)}\n`;
      } else {
        msg += `• *Paga con:* ${RESTAURANT_CONFIG.currencySymbol} ${customer.cashAmount}\n`;
      }
    }

    if (customer.notes) {
      msg += `\n💬 *Instrucciones adicionales:* ${customer.notes}\n`;
    }

    msg += `\n¡Muchas gracias! Quedo a la espera de su confirmación. 🔥🍗`;

    return msg;
  },

  generateWhatsAppUrl(
    items: CartItem[],
    customer: CustomerInfo,
    coupon: Coupon | null
  ): string {
    const text = this.formatWhatsAppMessage(items, customer, coupon);
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedText}`;
  },
};
