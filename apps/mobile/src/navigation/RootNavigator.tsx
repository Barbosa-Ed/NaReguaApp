import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ClientTabNavigator, OwnerTabNavigator } from './TabNavigator';
import { BarbershopDetailScreen } from '../screens/BarbershopDetailScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { BookingSuccessScreen } from '../screens/BookingSuccessScreen';
import { RateBarberScreen } from '../screens/RateBarberScreen';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accent,
  },
};

export const RootNavigator: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        {/* Renderiza a estrutura de abas exclusiva conforme o papel do usuário */}
        {userRole === 'client' ? (
          <Stack.Screen name="ClientTabs" component={ClientTabNavigator} />
        ) : (
          <Stack.Screen name="OwnerTabs" component={OwnerTabNavigator} />
        )}

        {/* Telas do fluxo do cliente */}
        <Stack.Screen name="BarbershopDetail" component={BarbershopDetailScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen
          name="BookingSuccess"
          component={BookingSuccessScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="RateBarber"
          component={RateBarberScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
