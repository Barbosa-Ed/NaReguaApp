import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  MOCK_BARBERSHOPS,
  MOCK_SERVICES,
  MOCK_PROFESSIONALS,
} from '../services/mockData';
import { APPOINTMENT_RULES } from '@naregua/shared';
import { colors } from '../theme/colors';

type RouteProps = RouteProp<RootStackParamList, 'Booking'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const AVAILABLE_DAYS = [
  { label: 'Hoje', date: '12/10' },
  { label: 'Amanhã', date: '13/10' },
  { label: 'Qua', date: '14/10' },
  { label: 'Qui', date: '15/10' },
  { label: 'Sex', date: '16/10' },
];

const AVAILABLE_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '13:30',
  '14:30',
  '15:30',
  '16:30',
  '17:30',
  '18:30',
];

export const BookingScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { barbershopId, initialServiceId } = route.params;

  const barbershop =
    MOCK_BARBERSHOPS.find((b) => b.id === barbershopId) || MOCK_BARBERSHOPS[0];
  const services = MOCK_SERVICES[barbershop.id] || MOCK_SERVICES['barber-1'] || [];
  const professionals =
    MOCK_PROFESSIONALS[barbershop.id] || MOCK_PROFESSIONALS['barber-1'] || [];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || services[0]?.id || ''
  );
  const [selectedProfId, setSelectedProfId] = useState<string>(
    professionals[0]?.id || ''
  );
  const [selectedDay, setSelectedDay] = useState<string>(AVAILABLE_DAYS[0].date);
  const [selectedTime, setSelectedTime] = useState<string>(AVAILABLE_SLOTS[0]);

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectedProf = professionals.find((p) => p.id === selectedProfId);

  const handleConfirm = () => {
    if (!selectedService || !selectedProf) {
      Alert.alert('Atenção', 'Selecione serviço e profissional.');
      return;
    }

    navigation.navigate('BookingSuccess', {
      barbershopName: barbershop.name,
      serviceName: selectedService.name,
      professionalName: selectedProf.name,
      dateFormatted: `${selectedDay} às ${selectedTime}`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Agendamento</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Step 1: Serviço */}
        <Text style={styles.sectionTitle}>1. Escolha o Serviço</Text>
        <View style={styles.optionsList}>
          {services.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceCard, isSelected && styles.serviceCardSelected]}
                onPress={() => setSelectedServiceId(service.id)}
              >
                <View style={styles.serviceDetails}>
                  <Text style={[styles.serviceName, isSelected && styles.serviceNameSelected]}>
                    {service.name}
                  </Text>
                  <Text style={styles.serviceMeta}>
                    ⏱ {service.durationMinutes} min • R${' '}
                    {(service.priceCents / 100).toFixed(2).replace('.', ',')}
                  </Text>
                </View>
                <Text style={styles.checkIcon}>{isSelected ? '🟢' : '⚪'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step 2: Profissional */}
        <Text style={styles.sectionTitle}>2. Escolha o Profissional</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.profScroll}
        >
          {professionals.map((prof) => {
            const isSelected = prof.id === selectedProfId;
            return (
              <TouchableOpacity
                key={prof.id}
                style={[styles.profCard, isSelected && styles.profCardSelected]}
                onPress={() => setSelectedProfId(prof.id)}
              >
                <Text style={styles.profCardAvatar}>💈</Text>
                <Text style={[styles.profCardName, isSelected && styles.profCardNameSelected]}>
                  {prof.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Step 3: Data */}
        <Text style={styles.sectionTitle}>3. Selecione o Dia</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
        >
          {AVAILABLE_DAYS.map((day) => {
            const isSelected = day.date === selectedDay;
            return (
              <TouchableOpacity
                key={day.date}
                style={[styles.dayCard, isSelected && styles.dayCardSelected]}
                onPress={() => setSelectedDay(day.date)}
              >
                <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>
                  {day.label}
                </Text>
                <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                  {day.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Step 4: Horário */}
        <Text style={styles.sectionTitle}>4. Selecione o Horário</Text>
        <View style={styles.timeGrid}>
          {AVAILABLE_SLOTS.map((time) => {
            const isSelected = time === selectedTime;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeSlotText, isSelected && styles.timeSlotTextSelected]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Regra de Negócio: Alerta Visual das 24h e 5h */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>⚠️ Regras de Confirmação & Faltas</Text>
          <Text style={styles.ruleItem}>
            • Seu horário é <Text style={styles.bold}>travado imediatamente</Text> sem custo.
          </Text>
          <Text style={styles.ruleItem}>
            • Você receberá lembrete de presença{' '}
            <Text style={styles.bold}>{APPOINTMENT_RULES.CONFIRMATION_REMINDER_HOURS_BEFORE}h antes</Text>.
          </Text>
          <Text style={styles.ruleItem}>
            • Caso não confirme até{' '}
            <Text style={styles.bold}>{APPOINTMENT_RULES.AUTO_CANCEL_HOURS_BEFORE}h antes</Text>, o horário é{' '}
            <Text style={styles.dangerText}>automaticamente cancelado</Text> e liberado.
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Confirm Button */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>Total a pagar no local</Text>
          <Text style={styles.footerPrice}>
            R$ {selectedService ? (selectedService.priceCents / 100).toFixed(2).replace('.', ',') : '0,00'}
          </Text>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Travar Horário ✅</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 6,
  },
  backBtnText: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  optionsList: {
    gap: 8,
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceCardSelected: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.surfaceElevated,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  serviceNameSelected: {
    color: colors.primaryLight,
  },
  serviceMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkIcon: {
    fontSize: 14,
    marginLeft: 10,
  },
  profScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profCard: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    alignItems: 'center',
  },
  profCardSelected: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.surfaceElevated,
  },
  profCardAvatar: {
    fontSize: 22,
    marginBottom: 6,
  },
  profCardName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  profCardNameSelected: {
    color: colors.primaryLight,
  },
  daysScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dayCard: {
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    alignItems: 'center',
  },
  dayCardSelected: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.surfaceElevated,
  },
  dayLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  dayLabelSelected: {
    color: colors.primaryLight,
  },
  dayDate: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  dayDateSelected: {
    color: colors.primaryLight,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 72,
    alignItems: 'center',
  },
  timeSlotSelected: {
    borderColor: colors.primaryLight,
    backgroundColor: colors.primary,
  },
  timeSlotText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  timeSlotTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  rulesCard: {
    backgroundColor: '#1f130b',
    borderWidth: 1,
    borderColor: '#78350f',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  rulesTitle: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  ruleItem: {
    color: '#fef3c7',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '700',
  },
  dangerText: {
    color: '#f87171',
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },
  confirmBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

