export type UserRole = 'client' | 'barber' | 'owner';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Barbershop {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  coverUrl?: string;
  avatarUrl?: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  distanceKm?: number; // Calculado em queries de geolocalização
  rating?: number; // Média de avaliações (ex: 4.8)
  reviewCount?: number; // Total de avaliações
}

export interface BarbershopService {
  id: string;
  barbershopId: string;
  name: string;
  description?: string;
  priceCents: number; // Preço armazenado em centavos para precisão
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BarberReview {
  id: string;
  appointmentId: string;
  barbershopId: string;
  professionalId: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl?: string;
  rating: number; // 1 a 5
  comment?: string;
  createdAt: string;
}

export interface Professional {
  id: string;
  barbershopId: string;
  userId?: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  rating?: number; // Média das avaliações do barbeiro (ex: 4.9)
  reviewCount?: number; // Quantidade de avaliações recebidas
  reviews?: BarberReview[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkingHour {
  id: string;
  barbershopId: string;
  professionalId?: string;
  dayOfWeek: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  startTime: string; // Ex: "09:00"
  endTime: string;   // Ex: "19:00"
  lunchStart?: string;
  lunchEnd?: string;
  isClosed: boolean;
}

export type AppointmentStatus =
  | 'pending_confirmation'    // Travado inicialmente pelo cliente
  | 'confirmed'               // Confirmado (notificação 24h respondida)
  | 'cancelled_by_client'     // Cancelado pelo próprio cliente
  | 'cancelled_by_barber'     // Cancelado pelo barbeiro ou dono
  | 'auto_cancelled_expired'  // Cancelado automaticamente por falta de confirmação (regra 5h)
  | 'completed'               // Atendimento realizado
  | 'no_show';                // Cliente faltou

export interface Appointment {
  id: string;
  barbershopId: string;
  professionalId: string;
  serviceId: string;
  clientId: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  priceCents: number;
  status: AppointmentStatus;
  confirmedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;

  // Relações opcionais para consultas com JOIN
  barbershop?: Barbershop;
  professional?: Professional;
  service?: BarbershopService;
  client?: UserProfile;
  review?: BarberReview;
}

export interface TimeSlot {
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  available: boolean;
}

