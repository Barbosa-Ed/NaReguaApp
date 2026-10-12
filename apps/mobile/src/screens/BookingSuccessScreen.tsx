import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type RouteProps = RouteProp<RootStackParamList, 'BookingSuccess'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const BookingSuccessScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { barbershopName, serviceName, professionalName, dateFormatted } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✅</Text>
        </View>

        <Text style={styles.title}>Horário Travado!</Text>
        <Text style={styles.subtitle}>
          Seu agendamento foi realizado com sucesso. Lembre-se de confirmar sua presença quando notificado!
        </Text>

        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Barbearia:</Text>
            <Text style={styles.value}>{barbershopName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Serviço:</Text>
            <Text style={styles.value}>{serviceName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profissional:</Text>
            <Text style={styles.value}>{professionalName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Data e Hora:</Text>
            <Text style={styles.valueHighlight}>{dateFormatted}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>🔔 Fique Atento:</Text>
          <Text style={styles.infoBoxText}>
            Enviaremos uma notificação 24h antes para você confirmar sua ida.
            A confirmação deve ser feita até 5h antes do horário marcado.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ClientTabs', { screen: 'AppointmentsTab' })}
        >
          <Text style={styles.primaryButtonText}>Ver Meus Agendamentos →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('ClientTabs', { screen: 'ExploreTab' })}
        >
          <Text style={styles.secondaryButtonText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#064e3b',
    borderWidth: 2,
    borderColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  valueHighlight: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#1f130b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#78350f',
    padding: 14,
    marginBottom: 24,
  },
  infoBoxTitle: {
    color: '#fbbf24',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoBoxText: {
    color: '#fef3c7',
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

