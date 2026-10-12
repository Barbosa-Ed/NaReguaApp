import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

const TODAY_AGENDA = [
  { time: '09:00', client: 'Lucas Silva', service: 'Degradê Navalhado', status: 'confirmado' },
  { time: '10:00', client: 'Gabriel Martins', service: 'Barba Terapia', status: 'confirmado' },
  { time: '11:00', client: 'Horário Livre', service: '-', status: 'livre' },
  { time: '12:00', client: 'Intervalo de Almoço', service: '-', status: 'bloqueado' },
  { time: '13:30', client: 'Matheus Costa', service: 'Combo Cabelo + Barba', status: 'pendente' },
  { time: '14:30', client: 'Horário Livre', service: '-', status: 'livre' },
];

export const BarberAdminScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleBlock = (time: string) => {
    Alert.alert(
      'Gerenciar Horário',
      `Deseja bloquear ou liberar o horário das ${time}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Bloquear Horário', onPress: () => Alert.alert('Horário bloqueado com sucesso!') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Painel da Barbearia</Text>
            <Text style={styles.subtitle}>Gestão de agenda e serviços</Text>
          </View>
        </View>

        {/* Quick Status Card */}
        <View style={styles.statusCard}>
          <View>
            <Text style={styles.statusLabel}>Status da Barbearia no Mapa</Text>
            <Text style={[styles.statusValue, isOpen ? styles.openText : styles.closedText]}>
              {isOpen ? '🟢 Aberta para agendamentos' : '🔴 Fechada no momento'}
            </Text>
          </View>
          <Switch
            value={isOpen}
            onValueChange={setIsOpen}
            trackColor={{ false: '#7f1d1d', true: '#065f46' }}
            thumbColor={isOpen ? '#34d399' : '#f87171'}
          />
        </View>

        {/* Agenda de Hoje */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📅 Agenda de Hoje</Text>
          <Text style={styles.dateBadge}>12 de Outubro</Text>
        </View>

        <View style={styles.agendaList}>
          {TODAY_AGENDA.map((item, index) => {
            const isLivre = item.status === 'livre';
            const isBloqueado = item.status === 'bloqueado';

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.agendaItem,
                  isLivre && styles.agendaItemLivre,
                  isBloqueado && styles.agendaItemBloqueado,
                ]}
                onPress={() => handleToggleBlock(item.time)}
              >
                <Text style={styles.agendaTime}>{item.time}</Text>

                <View style={styles.agendaInfo}>
                  <Text style={[styles.agendaClient, isLivre && styles.textMuted]}>
                    {item.client}
                  </Text>
                  <Text style={styles.agendaService}>{item.service}</Text>
                </View>

                <View style={styles.statusChip}>
                  <Text style={styles.statusChipText}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Gestão Rápida de Catálogo */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>✂️ Serviços Oferecidos</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Novo Serviço', 'Formulário de cadastro de serviço.')}
          >
            <Text style={styles.addServiceBtn}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceBox}>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>Degradê / Fade</Text>
            <Text style={styles.servicePrice}>R$ 45,00 (40 min)</Text>
          </View>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>Barba Completa</Text>
            <Text style={styles.servicePrice}>R$ 35,00 (30 min)</Text>
          </View>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>Combo Cabelo + Barba</Text>
            <Text style={styles.servicePrice}>R$ 70,00 (60 min)</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  openText: {
    color: colors.successLight,
  },
  closedText: {
    color: colors.danger,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dateBadge: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  agendaList: {
    gap: 8,
    marginBottom: 24,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  agendaItemLivre: {
    borderColor: '#1e3a5f',
    backgroundColor: '#0a192f',
  },
  agendaItemBloqueado: {
    opacity: 0.6,
  },
  agendaTime: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryLight,
    width: 60,
  },
  agendaInfo: {
    flex: 1,
  },
  agendaClient: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  textMuted: {
    color: colors.textMuted,
  },
  agendaService: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surfaceElevated,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  addServiceBtn: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
  serviceBox: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  servicePrice: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});

