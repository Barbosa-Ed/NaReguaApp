import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROFESSIONALS } from '../services/mockData';
import { colors } from '../theme/colors';

export const OwnerBarbershopScreen: React.FC = () => {
  const { ownerBarbershop, updateBarbershop, reviews } = useAuth();
  const professionals = MOCK_PROFESSIONALS[ownerBarbershop.id] || MOCK_PROFESSIONALS['barber-1'];

  const toggleOpen = () => {
    const nextState = !ownerBarbershop.isOpen;
    updateBarbershop({ isOpen: nextState });
    Alert.alert(
      'Visibilidade no Mapa',
      nextState
        ? 'Barbearia aberta! Os clientes agora podem agendar horários.'
        : 'Barbearia fechada. Novos agendamentos foram temporariamente pausados.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Minha Barbearia</Text>
          <Text style={styles.subtitle}>Informações públicas, equipe e reputação</Text>
        </View>

        {/* Cover & Brand Info */}
        <View style={styles.profileCard}>
          <Image source={{ uri: ownerBarbershop.coverUrl }} style={styles.coverImage} />

          <View style={styles.cardContent}>
            <View style={styles.brandRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.shopName}>{ownerBarbershop.name}</Text>
                <Text style={styles.shopAddress}>📍 {ownerBarbershop.address}</Text>
              </View>

              <View style={styles.ratingBox}>
                <Text style={styles.ratingNumber}>★ {ownerBarbershop.rating || '4.9'}</Text>
                <Text style={styles.ratingCount}>({ownerBarbershop.reviewCount || 62} avaliações)</Text>
              </View>
            </View>

            <Text style={styles.shopDesc}>{ownerBarbershop.description}</Text>

            {/* Open / Closed Toggle */}
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Status no Mapa</Text>
                <Text
                  style={[
                    styles.toggleStatus,
                    ownerBarbershop.isOpen ? styles.openText : styles.closedText,
                  ]}
                >
                  {ownerBarbershop.isOpen ? '🟢 Aberta para agendamentos' : '🔴 Fechada temporariamente'}
                </Text>
              </View>
              <Switch
                value={ownerBarbershop.isOpen}
                onValueChange={toggleOpen}
                trackColor={{ false: '#7f1d1d', true: '#065f46' }}
                thumbColor={ownerBarbershop.isOpen ? '#34d399' : '#f87171'}
              />
            </View>
          </View>
        </View>

        {/* Equipe e Avaliações de Barbeiros */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>💈 Equipe & Avaliações dos Barbeiros</Text>
        </View>

        {professionals.map((barber) => {
          // Filtrar avaliações deste barbeiro específico
          const barberReviews = reviews.filter((r) => r.professionalId === barber.id);

          return (
            <View key={barber.id} style={styles.barberCard}>
              <View style={styles.barberHeader}>
                <Image source={{ uri: barber.avatarUrl }} style={styles.barberAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.barberName}>{barber.name}</Text>
                  <Text style={styles.barberBio}>{barber.bio}</Text>
                  <View style={styles.barberRatingBadge}>
                    <Text style={styles.barberStars}>★ {barber.rating || 4.9}</Text>
                    <Text style={styles.barberCount}>
                      ({barberReviews.length + (barber.reviewCount || 0)} avaliações)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Avaliações Recentes do Barbeiro */}
              <View style={styles.reviewsList}>
                <Text style={styles.reviewsTitle}>Depoimentos de Clientes:</Text>
                {barberReviews.length > 0 ? (
                  barberReviews.map((rev) => (
                    <View key={rev.id} style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <Text style={styles.reviewAuthor}>👤 {rev.clientName}</Text>
                        <Text style={styles.reviewStars}>
                          {'★'.repeat(rev.rating)}
                        </Text>
                      </View>
                      {rev.comment && <Text style={styles.reviewComment}>"{rev.comment}"</Text>}
                    </View>
                  ))
                ) : (
                  <Text style={styles.noReviewsText}>
                    Ainda não há avaliações registradas para este profissional.
                  </Text>
                )}
              </View>
            </View>
          );
        })}

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
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  coverImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.surfaceElevated,
  },
  cardContent: {
    padding: 18,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  shopName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  shopAddress: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  ratingBox: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  ratingNumber: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '800',
  },
  ratingCount: {
    color: colors.textMuted,
    fontSize: 10,
  },
  shopDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    padding: 12,
    borderRadius: 12,
  },
  toggleLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  toggleStatus: {
    fontSize: 13,
    fontWeight: '700',
  },
  openText: {
    color: colors.successLight,
  },
  closedText: {
    color: colors.danger,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  barberCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  barberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  barberAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: colors.surfaceElevated,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  barberBio: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  barberRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barberStars: {
    color: '#fbbf24',
    fontSize: 13,
    fontWeight: '800',
  },
  barberCount: {
    color: colors.textMuted,
    fontSize: 12,
  },
  reviewsList: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  reviewsTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewItem: {
    backgroundColor: colors.surface,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  reviewStars: {
    color: '#fbbf24',
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  noReviewsText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});

