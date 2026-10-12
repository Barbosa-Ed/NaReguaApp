import { NavigatorScreenParams } from '@react-navigation/native';

export type ClientTabParamList = {
  ExploreTab: undefined;
  AppointmentsTab: undefined;
  ProfileTab: undefined;
};

export type OwnerTabParamList = {
  OwnerAgendaTab: undefined;
  OwnerServicesTab: undefined;
  OwnerBarbershopTab: undefined;
  OwnerProfileTab: undefined;
};

export type RootStackParamList = {
  ClientTabs: NavigatorScreenParams<ClientTabParamList>;
  OwnerTabs: NavigatorScreenParams<OwnerTabParamList>;
  BarbershopDetail: { barbershopId: string };
  Booking: { barbershopId: string; initialServiceId?: string };
  BookingSuccess: {
    barbershopName: string;
    serviceName: string;
    professionalName: string;
    dateFormatted: string;
  };
  RateBarber: {
    appointmentId: string;
    professionalId: string;
    professionalName: string;
    barbershopId: string;
  };
};
