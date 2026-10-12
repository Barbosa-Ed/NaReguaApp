import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClientTabParamList, OwnerTabParamList } from './types';
import { ExploreScreen } from '../screens/ExploreScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { OwnerAgendaScreen } from '../screens/OwnerAgendaScreen';
import { OwnerServicesScreen } from '../screens/OwnerServicesScreen';
import { OwnerBarbershopScreen } from '../screens/OwnerBarbershopScreen';
import { colors } from '../theme/colors';

const ClientTab = createBottomTabNavigator<ClientTabParamList>();
const OwnerTab = createBottomTabNavigator<OwnerTabParamList>();

// --- Navegador Exclusivo do Cliente ---
// O cliente vê somente: Barbearias disponíveis (Explorar), Seus agendamentos e Seu perfil
export const ClientTabNavigator: React.FC = () => {
  return (
    <ClientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <ClientTab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>💈</Text>,
        }}
      />

      <ClientTab.Screen
        name="AppointmentsTab"
        component={AppointmentsScreen}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>📅</Text>,
        }}
      />

      <ClientTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>👤</Text>,
        }}
      />
    </ClientTab.Navigator>
  );
};

// --- Navegador Exclusivo do Dono da Barbearia ---
// O dono vê: Agenda do dia, Gestão de Serviços (criar/editar), Perfil da sua Barbearia e Perfil
export const OwnerTabNavigator: React.FC = () => {
  return (
    <OwnerTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accentLight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <OwnerTab.Screen
        name="OwnerAgendaTab"
        component={OwnerAgendaScreen}
        options={{
          tabBarLabel: 'Agenda do Dia',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>📅</Text>,
        }}
      />

      <OwnerTab.Screen
        name="OwnerServicesTab"
        component={OwnerServicesScreen}
        options={{
          tabBarLabel: 'Serviços',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>✂️</Text>,
        }}
      />

      <OwnerTab.Screen
        name="OwnerBarbershopTab"
        component={OwnerBarbershopScreen}
        options={{
          tabBarLabel: 'Minha Barbearia',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>💈</Text>,
        }}
      />

      <OwnerTab.Screen
        name="OwnerProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Minha Conta',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>👤</Text>,
        }}
      />
    </OwnerTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
