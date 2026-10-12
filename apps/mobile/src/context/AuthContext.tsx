import React, { createContext, useContext, useState } from 'react';
import {
  UserProfile,
  Barbershop,
  BarbershopService,
  Appointment,
  BarberReview,
} from '@naregua/shared';
import {
  CURRENT_CLIENT_USER,
  CURRENT_OWNER_USER,
  MOCK_BARBERSHOPS,
  MOCK_SERVICES,
  MOCK_APPOINTMENTS,
  MOCK_REVIEWS,
} from '../services/mockData';

interface AuthContextType {
  userRole: 'client' | 'owner';
  currentUser: UserProfile;
  switchRole: (role: 'client' | 'owner') => void;
  // Gestão de Barbearia do Dono
  ownerBarbershop: Barbershop;
  updateBarbershop: (data: Partial<Barbershop>) => void;
  // Gestão de Serviços
  services: BarbershopService[];
  addService: (data: Omit<BarbershopService, 'id' | 'barbershopId' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, data: Partial<BarbershopService>) => void;
  deleteService: (id: string) => void;
  // Gestão de Agendamentos
  appointments: Appointment[];
  confirmPresence: (id: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  completeAppointment: (id: string) => void;
  // Avaliações de Barbeiros
  reviews: BarberReview[];
  addReview: (data: Omit<BarberReview, 'id' | 'createdAt'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'client' | 'owner'>('client');
  const [ownerBarbershop, setOwnerBarbershop] = useState<Barbershop>(MOCK_BARBERSHOPS[0]);
  const [services, setServices] = useState<BarbershopService[]>(MOCK_SERVICES['barber-1']);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [reviews, setReviews] = useState<BarberReview[]>(MOCK_REVIEWS);

  const currentUser = userRole === 'client' ? CURRENT_CLIENT_USER : CURRENT_OWNER_USER;

  const switchRole = (role: 'client' | 'owner') => {
    setUserRole(role);
  };

  const updateBarbershop = (data: Partial<Barbershop>) => {
    setOwnerBarbershop((prev) => ({ ...prev, ...data, updatedAt: new Date().toISOString() }));
  };

  const addService = (data: Omit<BarbershopService, 'id' | 'barbershopId' | 'createdAt' | 'updatedAt'>) => {
    const newService: BarbershopService = {
      ...data,
      id: `srv-${Date.now()}`,
      barbershopId: ownerBarbershop.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, data: Partial<BarbershopService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const confirmPresence = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'confirmed', confirmedAt: new Date().toISOString() } : a))
    );
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: userRole === 'client' ? 'cancelled_by_client' : 'cancelled_by_barber',
              cancelledAt: new Date().toISOString(),
              cancelReason: reason,
            }
          : a
      )
    );
  };

  const completeAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'completed' } : a))
    );
  };

  const addReview = (data: Omit<BarberReview, 'id' | 'createdAt'>) => {
    const newRev: BarberReview = {
      ...data,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newRev, ...prev]);

    // Anexa a review no agendamento correspondente
    setAppointments((prev) =>
      prev.map((a) => (a.id === data.appointmentId ? { ...a, review: newRev } : a))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        currentUser,
        switchRole,
        ownerBarbershop,
        updateBarbershop,
        services,
        addService,
        updateService,
        deleteService,
        appointments,
        confirmPresence,
        cancelAppointment,
        completeAppointment,
        reviews,
        addReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};

