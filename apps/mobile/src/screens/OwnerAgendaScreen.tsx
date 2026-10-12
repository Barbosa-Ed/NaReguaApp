import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';

export const OwnerAgendaScreen: React.FC = () => {
  const { appointments, completeAppointment, cancelAppointment, ownerBarbershop } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');

  const filteredAppointments = appointments.filter((item) => {
    if (filter === 'pending') return item.status === 'pending_confirmation';
    if (filter === 'confirmed') return item.status === 'confirmed';
    return true;
  });

  const handleComplete = (id: string, clientName?: string) => {
    Alert.alert(
      'Concluir Atendimento',
      `Confirmar que o atendimento de ${clientName || 'Cliente'} foi finalizado?`,
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Sim, Concluído!',
          onPress: () => {
            completeAppointment(id);
            Alert.alert('Sucesso', 'Atendimento marcado como concluído.');
          },
        },
      ]
    );
  };

  const handleCancel = (id: string) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Deseja cancelar este agendamento? O cliente será notificado imediatamente.',
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Confirmar Cancelamento',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(id, 'Cancelado pelo estabelecimento.');
            Alert.alert('Cancelado', 'Agendamento cancelado.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Agenda do Dia</Text>
            <Text style={styles.subtitle}>
              {ownerBarbershop.name} • 12 de Outubro
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterPill, filter === 'all' && styles.filterPillActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              Todos ({appointments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filter === 'confirmed' && styles.filterPillActive]}
            onPress={() => setFilter('confirmed')}
          >
            <Text style={[styles.filterText, filter === 'confirmed' && styles.filterTextActive]}>
              Confirmados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filter === 'pending' && styles.filterPillActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Aguardando Confirmação
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const dateObj = new Date(item.startTime);
            const timeFormatted = dateObj.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.timeTag}>
                    <Text style={styles.timeText}>{timeFormatted}</Text>
                  </View>
                  <StatusBadge status={item.status} />
                </View>

                <View style={styles.bodyRow}>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>
                      👤 {item.client?.name || 'Cliente (Lucas Silva)'}
                    </Text>
                    <Text style={styles.serviceName}>
                      ✂️ {item.service?.name || 'Corte Degradê / Combo'}
                    </Text>
                    <Text style={styles.barberName}>
                      💈 Barbeiro: {item.professional?.name || 'Rodrigo Navalha'}
                    </Text>
                  </View>

                  <Text style={styles.priceText}>
                    R$ {(item.priceCents / 100).toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                {/* Actions if pending or confirmed */}
                {(item.status === 'confirmed' || item.status === 'pending_confirmation') && (
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      onPress={() => handleCancel(item.id)}
                    >
                      <Text style={styles.cancelBtnText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.completeBtn}
                      onPress={() => handleComplete(item.id, item.client?.name)}
                    >
                      <Text style={styles.completeBtnText}>Concluir Corte ✓</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === 'completed' && (
                  <View style={styles.completedNotice}>
                    <Text style={styles.completedNoticeText}>
                      ✓ Atendimento finalizado
                    </Text>
                    {item.review && (
                      <Text style={styles.reviewScore}>
                        ★ {item.review.rating}/5 avaliado
                      </Text>
                    )}
                  </View>
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum agendamento para este filtro.</Text>
            </View>
          }
        />
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.primaryLight,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.primaryLight,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeTag: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  timeText: {
    color: colors.primaryLight,
    fontWeight: '800',
    fontSize: 14,
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flex: 1,
    gap: 3,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  serviceName: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  barberName: {
    fontSize: 12,
    color: colors.textMuted,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryLight,
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  completeBtn: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  completedNotice: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedNoticeText: {
    color: colors.successLight,
    fontSize: 12,
    fontWeight: '600',
  },
  reviewScore: {
    color: colors.accentLight,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});

