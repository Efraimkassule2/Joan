import { Dish, ReservationData, OrderRecord, RestaurantContactInfo, CartItem } from '../types';
import { DISHES, RESTAURANT_INFO } from '../data/restaurantData';

const STORAGE_KEYS = {
  INFO: 'jb_restaurant_info_v1',
  DISHES: 'jb_dishes_v1',
  RESERVATIONS: 'jb_reservations_v1',
  ORDERS: 'jb_orders_v1',
};

// --- RESTAURANT INFO ---
export function getStoredRestaurantInfo(): RestaurantContactInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INFO);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Erro ao ler dados do restaurante:', e);
  }
  return RESTAURANT_INFO;
}

export function saveStoredRestaurantInfo(info: RestaurantContactInfo): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(info));
    window.dispatchEvent(new Event('jb_info_updated'));
  } catch (e) {
    console.error('Erro ao gravar dados do restaurante:', e);
  }
}

// --- DISHES / CARDÁPIO ---
export function getStoredDishes(): Dish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISHES);
    if (raw) {
      const parsed: Dish[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erro ao ler cardápio:', e);
  }
  // Initialize from default dishes
  const initial = DISHES.map((d) => ({
    ...d,
    available: d.available ?? true,
  }));
  saveStoredDishes(initial);
  return initial;
}

export function saveStoredDishes(dishes: Dish[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
    window.dispatchEvent(new Event('jb_dishes_updated'));
  } catch (e) {
    console.error('Erro ao gravar cardápio:', e);
  }
}

export function saveDishItem(dish: Dish): Dish {
  const current = getStoredDishes();
  const index = current.findIndex((d) => d.id === dish.id);
  let updated: Dish[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...dish };
  } else {
    updated = [{ ...dish, id: dish.id || `dish-${Date.now()}` }, ...current];
  }
  saveStoredDishes(updated);
  return dish;
}

export function toggleDishAvailability(id: string): boolean {
  const current = getStoredDishes();
  const target = current.find((d) => d.id === id);
  if (!target) return false;
  target.available = target.available === false ? true : false;
  saveStoredDishes(current);
  return target.available;
}

export function deleteDishItem(id: string): void {
  const current = getStoredDishes();
  const updated = current.filter((d) => d.id !== id);
  saveStoredDishes(updated);
}

// --- RESERVAS ---
export function getStoredReservations(): ReservationData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (raw) {
      const list: ReservationData[] = JSON.parse(raw);
      return list.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
  } catch (e) {
    console.error('Erro ao ler reservas:', e);
  }
  return [];
}

export function createStoredReservation(
  data: Omit<ReservationData, 'id' | 'createdAt' | 'status'>
): ReservationData {
  const newReservation: ReservationData = {
    ...data,
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'pendente',
  };

  const current = getStoredReservations();
  const updated = [newReservation, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    window.dispatchEvent(new Event('jb_reservations_updated'));
  } catch (e) {
    console.error('Erro ao gravar reserva:', e);
  }
  return newReservation;
}

export function updateReservationStatus(id: string, status: 'pendente' | 'confirmada' | 'cancelada'): void {
  const current = getStoredReservations();
  const index = current.findIndex((r) => r.id === id);
  if (index >= 0) {
    current[index].status = status;
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(current));
    window.dispatchEvent(new Event('jb_reservations_updated'));
  }
}

export function deleteStoredReservation(id: string): void {
  const current = getStoredReservations();
  const updated = current.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
  window.dispatchEvent(new Event('jb_reservations_updated'));
}

// --- PEDIDOS ---
export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) {
      const list: OrderRecord[] = JSON.parse(raw);
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } catch (e) {
    console.error('Erro ao ler pedidos:', e);
  }
  return [];
}

export function createStoredOrder(orderData: {
  customerName?: string;
  orderType: 'mesa' | 'takeaway' | 'entrega';
  tableNumber?: string;
  addressBenguela?: string;
  notes?: string;
  items: CartItem[];
  totalKz: number;
}): OrderRecord {
  const newOrder: OrderRecord = {
    id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    customerName: orderData.customerName,
    orderType: orderData.orderType,
    tableNumber: orderData.tableNumber,
    addressBenguela: orderData.addressBenguela,
    notes: orderData.notes,
    items: orderData.items,
    totalKz: orderData.totalKz,
    status: 'recebido',
    createdAt: new Date().toISOString(),
  };

  const current = getStoredOrders();
  const updated = [newOrder, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    window.dispatchEvent(new Event('jb_orders_updated'));
  } catch (e) {
    console.error('Erro ao gravar pedido:', e);
  }
  return newOrder;
}

export function updateOrderStatus(id: string, status: 'recebido' | 'em_preparo' | 'concluido' | 'cancelado'): void {
  const current = getStoredOrders();
  const index = current.findIndex((o) => o.id === id);
  if (index >= 0) {
    current[index].status = status;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(current));
    window.dispatchEvent(new Event('jb_orders_updated'));
  }
}

export function deleteStoredOrder(id: string): void {
  const current = getStoredOrders();
  const updated = current.filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  window.dispatchEvent(new Event('jb_orders_updated'));
}

// --- WHATSAPP HELPER ---
export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const encodedText = encodeURIComponent(text.trim());
  if (!cleanPhone || cleanPhone.length < 5) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
