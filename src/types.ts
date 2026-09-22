export interface Dish {
  id: string;
  name: string;
  description: string;
  priceKz: number;
  priceDisplay?: string;
  category: 'entradas' | 'mar' | 'carnes' | 'tipicos' | 'sobremesas' | 'bebidas';
  image: string;
  badge?: string;
  isSpecialty?: boolean;
  ingredients?: string[];
  pairing?: string;
  available?: boolean;
}

export interface MenuCategory {
  id: 'todos' | 'entradas' | 'mar' | 'carnes' | 'tipicos' | 'sobremesas' | 'bebidas';
  name: string;
  description: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  notes?: string;
}

export interface ReservationData {
  id?: string;
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests?: string;
  createdAt?: string;
  status?: 'pendente' | 'confirmada' | 'cancelada';
}

export interface OrderRecord {
  id: string;
  customerName?: string;
  orderType: 'mesa' | 'takeaway' | 'entrega';
  tableNumber?: string;
  addressBenguela?: string;
  notes?: string;
  items: CartItem[];
  totalKz: number;
  status: 'recebido' | 'em_preparo' | 'concluido' | 'cancelado';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'todos' | 'pratos' | 'ambiente' | 'bebidas';
  image: string;
  caption: string;
}

export interface RestaurantContactInfo {
  name: string;
  subtitle: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
    closed: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
}
