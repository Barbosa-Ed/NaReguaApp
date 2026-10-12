import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AppointmentsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { appointments, confirmPresence, cancelAppointment } = useAuth();

  const handleConfirmPresence = (id: string) => {
    Alert.alert(
      'Confirmar Presença',
      'Você confirma que comparecerá ao horário agendado?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, vou comparecer!',
          onPress: () => {
            confirmPresence(id);
            Alert.alert('Presença Confirmada! ✂️', 'Te esperamos no horário marcado.');
          },
        },
      ]
    );
  };

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      'Cancelar Horário',
      'Tem certeza que deseja cancelar? O horário será liberado para outro cliente.',
      [
        { text: 'Voltar', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(id);
            Alert.alert('Cancelado', 'Seu agendamento foi cancelado.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Meus Agendamentos</Text>
          <Text style={styles.subtitle}>Acompanhe e confirme seus horários</Text>
        </View>

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const dateObj = new Date(item.startTime);
            const dateFormatted = `${dateObj.toLocaleDateString('pt-BR')} às ${dateObj.toLocaleTimeString(
              'pt-BR',
              { hour: '2-digit', minute: '2-digit' }
            )}`;

            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.shopName}>
                    {item.barbershop?.name || 'Barbearia'}
                  </Text>
                  <StatusBadge status={item.status} />
                </View>

                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>📅 {dateFormatted}</Text>
                  <Text style={styles.priceText}>
                    R$ {(item.priceCents / 100).toFixed(2).replace('.', ',')}
                  </Text>
                </View>

                {/* Ações disponíveis conforme regra de ciclo de vida */}
                {item.status === 'pending_confirmation' && (
                  <View style={styles.actionsContainer}>
                    <View style={styles.warningBox}>
                      <Text style={styles.warningText}>
                        ⏳ Confirme sua presença para garantir a vaga até 5h antes.
                      </Text>
                    </View>

                    <View style={styles.buttonsRow}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => handleCancelAppointment(item.id)}
                      >
                        <Text style={styles.cancelBtnText}>Cancelar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={() => handleConfirmPresence(item.id)}
                      >
                        <Text style={styles.confirmBtnText}>Confirmar Presença ✅</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {item.status === 'confirmed' && (
                  <View style={styles.confirmedNotice}>
                    <Text style={styles.confirmedNoticeText}>
                      🎉 Presença confirmada! Enviaremos um lembrete 1 hora antes.
                    </Text>
                    <TouchableOpacity
                      style={styles.cancelLink}
                      onPress={() => handleCancelAppointment(item.id)}
                    >
                      <Text style={styles.cancelLinkText}>Preciso cancelar</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.status === 'completed' && (
                  <View style={styles.completedBox}>
                    <View style={styles.completedHeader}>
                      <Text style={styles.completedText}>✓ Corte Realizado</Text>
                      {item.review ? (
                        <View style={styles.reviewedBadge}>
                          <Text style={styles.reviewedText}>
                            ★ {item.review.rating}/5 Avaliado
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    {!item.review && (
                      <TouchableOpacity
                        style={styles.rateButton}
                        onPress={() =>
                          navigation.navigate('RateBarber', {
                            appointmentId: item.id,
                            professionalId: item.professionalId,
                            professionalName: item.professional?.name || 'Barbeiro',
                            barbershopId: item.barbershopId,
                          })
                        }
                      >
                        <Text style={styles.rateButtonText}>
                          ⭐ Avaliar Barbeiro
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Você ainda não possui agendamentos.</Text>
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
    marginBottom: 18,
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
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  actionsContainer: {
    gap: 10,
  },
  warningBox: {
    backgroundColor: '#27170a',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#78350f',
  },
  warningText: {
    color: '#fbbf24',
    fontSize: 12,
    lineHeight: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  confirmedNotice: {
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmedNoticeText: {
    color: colors.successLight,
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  cancelLink: {
    padding: 4,
  },
  cancelLinkText: {
    color: colors.danger,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  completedBox: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    gap: 8,
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  reviewedBadge: {
    backgroundColor: '#3b2505',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#b45309',
  },
  reviewedText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '700',
  },
  rateButton: {
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
  },
  rateButtonText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
});

