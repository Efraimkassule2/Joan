/**
 * Camada de Persistência Local Autônoma
 * Totalmente desacoplada de Firestore/backends externos.
 */

import { ReservationData, CartItem } from '../types';
import {
  createStoredReservation,
  createStoredOrder,
  generateWhatsAppLink as coreGenerateWhatsAppLink,
  getStoredReservations,
  getStoredOrders,
} from './restaurantStorage';

export interface SavedOrder {
  id: string;
  items: CartItem[];
  totalKz: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  createdAt: string;
  status: 'enviado_whatsapp' | 'pendente';
}

export async function createReservation(
  data: Omit<ReservationData, 'id' | 'createdAt' | 'status'>
): Promise<ReservationData> {
  const res = createStoredReservation(data);
  // Simulação rápida para feedback visual suave
  await new Promise((resolve) => setTimeout(resolve, 300));
  return res;
}

export async function recordWhatsAppOrder(
  items: CartItem[],
  totalKz: number,
  customerName?: string,
  customerPhone?: string,
  orderType: 'mesa' | 'takeaway' | 'entrega' = 'mesa',
  tableNumber?: string,
  addressBenguela?: string,
  notes?: string
): Promise<SavedOrder> {
  const ord = createStoredOrder({
    items,
    totalKz,
    customerName,
    orderType,
    tableNumber,
    addressBenguela,
    notes,
  });

  return {
    id: ord.id,
    items: ord.items,
    totalKz: ord.totalKz,
    customerName: ord.customerName,
    customerPhone,
    notes: ord.notes,
    createdAt: ord.createdAt,
    status: 'enviado_whatsapp',
  };
}

export function generateWhatsAppLink(phone: string, text: string): string {
  return coreGenerateWhatsAppLink(phone, text);
}

export function getAllReservations(): ReservationData[] {
  return getStoredReservations();
}

export function getAllOrders() {
  return getStoredOrders();
}
