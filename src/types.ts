export type AppointmentStatus = 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELLED';

export type ServiceCategory = 'HAIR' | 'BROW' | 'NAIL' | 'MAKEUP' | 'SKIN';

export interface BeautyService {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number; // in Tomans
  durationMinutes: number;
  description?: string;
  image?: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceId?: string;
  dateShamsi: string; // e.g. "۱۴۰۵/۰۵/۲۰" or "امروز (۲۰ مرداد)"
  time: string; // e.g. "14:30"
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  salonId?: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  lastVisitDate: string;
  totalSpent: number;
  notes: string;
  isVip?: boolean;
}

export interface Salon {
  id: string;
  name: string;
  ownerName: string;
  phoneNumber: string;
  address: string;
  area: string;
  rating: number;
  reviewCount: number;
  image: string;
  services: BeautyService[];
  workingHours: {
    start: string;
    end: string;
    holidays: string[];
  };
}

export type AuthState = 'ENTER_PHONE' | 'WAITING_FOR_OTP' | 'AUTHENTICATED';

export type UserRole = 'SALON_OWNER' | 'CUSTOMER';

export type BookingStep = 'SELECT_SERVICE' | 'SELECT_DATE' | 'SELECT_TIME' | 'CONFIRMATION';

export type ActiveScreen = 
  | 'login'
  | 'owner_home'
  | 'appointments'
  | 'services'
  | 'customers'
  | 'customer_profile'
  | 'reports'
  | 'owner_profile'
  | 'customer_home'
  | 'salon_detail'
  | 'booking';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'CONFIRMATION' | 'NEW_BOOKING' | 'SMS_SENT' | 'CANCEL' | 'INFO';
  timestamp: string;
  read: boolean;
  appointmentId?: string;
  customerName?: string;
  serviceName?: string;
  salonName?: string;
  smsPreview?: string;
}
