import React, { useState, useEffect } from 'react';
import {
  X,
  ChefHat,
  Clock,
  CheckCircle2,
  AlertCircle,
  Printer,
  Volume2,
  VolumeX,
  Bike,
  Store,
  Utensils,
  ArrowRight,
  RotateCcw,
  Smartphone,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderTicket, OrderStatus } from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';

interface KitchenOrdersManagerProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
}

export const KitchenOrdersManager: React.FC<KitchenOrdersManagerProps> = ({
  isOpen,
  onClose,
  restaurantName = RESTAURANT_CONFIG.name,
}) => {
  const { orders, updateOrderStatus, clearOrdersHistory } = useCart();
  const [selectedStatusTab, setSelectedStatusTab] = useState<OrderStatus | 'todos'>('todos');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ticketToPrint, setTicketToPrint] = useState<OrderTicket | null>(null);

  if (!isOpen) return null;

  // Filter orders by active status tab
  const filteredOrders = orders.filter((o) => {
    if (selectedStatusTab === 'todos') return true;
    return o.status === selectedStatusTab;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'nuevo':
        return {
          label: 'NUEVO PEDIDO',
          classes: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse',
        };
      case 'en_cocina':
        return {
          label: 'EN PREPARACIÓN',
          classes: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        };
      case 'listo':
        return {
          label: 'LISTO PARA DESPACHO',
          classes: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        };
      case 'entregado':
        return {
          label: 'ENTREGADO',
          classes: 'bg-zinc-800 text-zinc-400 border-zinc-700',
        };
      case 'cancelado':
        return {
          label: 'CANCELADO',
          classes: 'bg-rose-950 text-rose-400 border-rose-800',
        };
    }
  };

  const calculateMinutesAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Hace un instante';
    if (mins === 1) return 'Hace 1 minuto';
    return `Hace ${mins} min`;
  };

  const handlePrint = (ticket: OrderTicket) => {
    setTicketToPrint(ticket);
  };

  return (
    <div
      id="kitchen-kds-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden"
    >
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#0f1017] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* KDS Header */}
        <div className="p-4 sm:p-5 bg-[#161723] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-heading text-white">
                  KDS • Panel de Cocina & Pedidos
                </h2>
                <span className="hidden sm:inline bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  MODO DEMOSTRACIÓN
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Sistema modular preparado para conectar con POS, impresoras térmicas y panel de
                despacho.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio chime toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Silenciar alertas' : 'Activar alertas de sonido'}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs flex items-center gap-1.5 transition-all"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
              <span className="hidden md:inline text-[11px]">
                {soundEnabled ? 'Alertas ON' : 'Alertas OFF'}
              </span>
            </button>

            {/* Clear orders */}
            {orders.length > 0 && (
              <button
                onClick={clearOrdersHistory}
                title="Limpiar pedidos completados de prueba"
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-red-400 rounded-xl text-xs transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Close */}
            <button
              id="kds-close-btn"
              onClick={onClose}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all"
              aria-label="Cerrar panel de cocina"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Architecture Note Banner */}
        <div className="bg-amber-950/40 border-b border-amber-900/40 px-4 py-2 text-xs text-amber-200/90 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Arquitectura Desacoplada:</strong> Esta vista funciona en el navegador de
              forma interactiva y almacena tickets localmente. Lista para conectarse a endpoints
              REST / WebSockets cuando configures tu servidor de cocina.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-400 whitespace-nowrap bg-black/40 px-2 py-0.5 rounded">
            API Ready
          </span>
        </div>

        {/* Filter Status Tabs */}
        <div className="px-4 sm:px-6 pt-3 pb-2 bg-[#12131d] border-b border-zinc-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'todos', label: 'Todos los Pedidos', count: orders.length },
            {
              id: 'nuevo',
              label: 'Nuevos',
              count: orders.filter((o) => o.status === 'nuevo').length,
            },
            {
              id: 'en_cocina',
              label: 'En Cocina',
              count: orders.filter((o) => o.status === 'en_cocina').length,
            },
            {
              id: 'listo',
              label: 'Listos para Salir',
              count: orders.filter((o) => o.status === 'listo').length,
            },
            {
              id: 'entregado',
              label: 'Completados',
              count: orders.filter((o) => o.status === 'entregado').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id as OrderStatus | 'todos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatusTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatusTab === tab.id
                    ? 'bg-black/40 text-white'
                    : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tickets Grid View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0c0d14]">
          {filteredOrders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                <ChefHat className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">No hay comandas en esta pestaña</h4>
              <p className="text-xs text-zinc-400 max-w-sm">
                Cuando los clientes envíen pedidos desde el menú digital, aparecerán aquí en tiempo
                real con sus instrucciones de cocina.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredOrders.map((ticket) => {
                const badge = getStatusBadge(ticket.status);

                return (
                  <div
                    key={ticket.id}
                    id={`kds-ticket-${ticket.id}`}
                    className={`bg-[#141520] border rounded-3xl p-5 flex flex-col justify-between shadow-xl transition-all ${
                      ticket.status === 'nuevo'
                        ? 'border-red-500/50 ring-1 ring-red-500/30'
                        : ticket.status === 'en_cocina'
                        ? 'border-amber-500/40'
                        : 'border-zinc-800'
                    }`}
                  >
                    {/* Ticket Header */}
                    <div className="space-y-3 pb-3 border-b border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-black text-amber-400 tracking-wider">
                          {ticket.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.classes}`}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-orange-400" />
                          <span>{calculateMinutesAgo(ticket.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-300 font-semibold uppercase">
                          {ticket.formData.orderType === 'delivery' && (
                            <span className="flex items-center gap-1 text-orange-400">
                              <Bike className="w-3.5 h-3.5" /> Delivery
                            </span>
                          )}
                          {ticket.formData.orderType === 'pickup' && (
                            <span className="flex items-center gap-1 text-blue-400">
                              <Store className="w-3.5 h-3.5" /> Para llevar
                            </span>
                          )}
                          {ticket.formData.orderType === 'dine_in' && (
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Utensils className="w-3.5 h-3.5" /> Mesa {ticket.formData.tableNumber || 'S/N'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="bg-[#181926] p-2.5 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between font-bold text-white">
                          <span>{ticket.formData.customerName}</span>
                          <span className="font-mono text-zinc-400">{ticket.formData.phone}</span>
                        </div>
                        {ticket.formData.deliveryAddress && (
                          <p className="text-[11px] text-zinc-400 leading-tight">
                            📍 {ticket.formData.deliveryAddress}
                          </p>
                        )}
                        {ticket.formData.notes && (
                          <p className="text-[11px] text-amber-300 italic">
                            ⚠️ &ldquo;{ticket.formData.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Food Items Comanda List */}
                    <div className="py-4 space-y-3 flex-grow">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                        Platos a preparar:
                      </span>
                      {ticket.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 text-xs bg-black/20 p-2 rounded-xl"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded bg-orange-500/20 text-orange-400 font-mono text-[11px] flex items-center justify-center font-black">
                                {item.quantity}x
                              </span>
                              <span>{item.name}</span>
                            </div>

                            {item.selectedOptions && item.selectedOptions.length > 0 && (
                              <div className="text-[11px] text-amber-400/90 pl-6">
                                {item.selectedOptions.map((o) => o.optionName).join(' • ')}
                              </div>
                            )}

                            {item.notes && (
                              <div className="text-[11px] text-orange-300 italic pl-6">
                                [Cocina: {item.notes}]
                              </div>
                            )}
                          </div>

                          <span className="text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                            USD {(item.unitPriceUSD * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Controls & State Steppers */}
                    <div className="pt-3 border-t border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">Total cobrado:</span>
                        <span className="text-sm font-black text-amber-400">
                          USD {ticket.totalUSD.toFixed(2)}
                        </span>
                      </div>

                      {/* Status Stepper Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        {ticket.status === 'nuevo' && (
                          <button
                            onClick={() => updateOrderStatus(ticket.id, 'en_cocina')}
                            className="col-span-2 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-black font-black py-2.5 px-3 rounded-xl text-xs transition-all"
                          >
                            <ChefHat className="w-4 h-4" />
                            <span>Pasar a Cocina (Preparar)</span>
                          </button>
                        )}

                        {ticket.status === 'en_cocina' && (
                          <button
                            onClick={() => updateOrderStatus(ticket.id, 'listo')}
                            className="col-span-2 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-black py-2.5 px-3 rounded-xl text-xs transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Marcar Listo para Despacho</span>
                          </button>
                        )}

                        {ticket.status === 'listo' && (
                          <button
                            onClick={() => updateOrderStatus(ticket.id, 'entregado')}
                            className="col-span-2 flex items-center justify-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all"
                          >
                            <span>Completar y Archivar Pedido</span>
                          </button>
                        )}

                        {ticket.status === 'entregado' && (
                          <div className="col-span-2 text-center text-xs text-zinc-500 font-semibold py-1">
                            ✓ Pedido despachado con éxito
                          </div>
                        )}

                        {/* Print POS Ticket Button */}
                        <button
                          onClick={() => handlePrint(ticket)}
                          className="flex items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-xl text-[11px] font-semibold transition-all"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Comanda Térmica</span>
                        </button>

                        {/* WhatsApp Customer Contact Link */}
                        <a
                          href={`https://wa.me/${ticket.formData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hola ${ticket.formData.customerName}, te escribimos de ${restaurantName} con respecto a tu pedido ${ticket.orderNumber} 🔥`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] py-2 px-3 rounded-xl text-[11px] font-semibold transition-all"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Chat Cliente</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* THERMAL TICKET PRINT SIMULATOR MODAL */}
        {ticketToPrint && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setTicketToPrint(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-black p-6 rounded-2xl max-w-sm w-full font-mono text-xs shadow-2xl space-y-4"
            >
              <div className="text-center border-b border-black pb-3 space-y-1">
                <h3 className="text-base font-black uppercase tracking-wider">
                  {restaurantName}
                </h3>
                <p className="text-[10px]">{RESTAURANT_CONFIG.contact.address}</p>
                <p className="text-[10px]">Tel: {RESTAURANT_CONFIG.contact.phone}</p>
                <div className="text-xs font-bold pt-1">
                  ORDEN: {ticketToPrint.orderNumber}
                </div>
                <div className="text-[10px] text-zinc-600">
                  {new Date(ticketToPrint.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="border-b border-black pb-2 space-y-0.5">
                <div>CLIENTE: {ticketToPrint.formData.customerName}</div>
                <div>TELÉFONO: {ticketToPrint.formData.phone}</div>
                <div>TIPO: {ticketToPrint.formData.orderType.toUpperCase()}</div>
                {ticketToPrint.formData.deliveryAddress && (
                  <div>DIR: {ticketToPrint.formData.deliveryAddress}</div>
                )}
                {ticketToPrint.formData.notes && (
                  <div>NOTA: {ticketToPrint.formData.notes}</div>
                )}
              </div>

              <div className="space-y-1 border-b border-black pb-3">
                <div className="flex justify-between font-bold">
                  <span>CANT / DESCRIPCIÓN</span>
                  <span>TOTAL</span>
                </div>
                {ticketToPrint.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <span>
                        {it.quantity}x {it.name}
                      </span>
                      {it.selectedOptions && it.selectedOptions.length > 0 && (
                        <div className="text-[10px] text-zinc-600 pl-2">
                          * {it.selectedOptions.map((o) => o.optionName).join(', ')}
                        </div>
                      )}
                    </div>
                    <span>USD {(it.unitPriceUSD * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-right font-bold">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span>USD {ticketToPrint.subtotalUSD.toFixed(2)}</span>
                </div>
                {ticketToPrint.deliveryFeeUSD > 0 && (
                  <div className="flex justify-between">
                    <span>ENVÍO:</span>
                    <span>USD {ticketToPrint.deliveryFeeUSD.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-1 border-t border-black">
                  <span>TOTAL A COBRAR:</span>
                  <span>USD {ticketToPrint.totalUSD.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-[10px]">
                ¡Gracias por su preferencia!
                <br />
                *** COPIA DE COCINA / DESPACHO ***
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-black text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={() => setTicketToPrint(null)}
                  className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-black font-bold py-2 rounded-lg text-xs"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
