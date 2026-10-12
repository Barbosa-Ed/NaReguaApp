import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Barbershop } from '@naregua/shared';
import { colors } from '../theme/colors';

interface BarbershopCardProps {
  barbershop: Barbershop;
  onPress: () => void;
}

export const BarbershopCard: React.FC<BarbershopCardProps> = ({ barbershop, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={onPress}
    >
      <Image
        source={{ uri: barbershop.coverUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {barbershop.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {barbershop.rating || '4.8'}</Text>
          </View>
        </View>

        <View style={styles.subHeaderRow}>
          <Text style={styles.address} numberOfLines={1}>
            📍 {barbershop.address}
          </Text>
          <View style={[styles.statusBadge, barbershop.isOpen ? styles.openBadge : styles.closedBadge]}>
            <Text style={[styles.statusText, barbershop.isOpen ? styles.openText : styles.closedText]}>
              {barbershop.isOpen ? 'ABERTO' : 'FECHADO'}
            </Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.distanceChip}>
            <Text style={styles.distanceText}>
              🚗 {barbershop.distanceKm ? `${barbershop.distanceKm.toFixed(1)} km` : 'Próximo'}
            </Text>
          </View>

          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Ver Serviços →</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceElevated,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: '#3b2505',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#b45309',
  },
  ratingText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '800',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  openBadge: {
    backgroundColor: '#064e3b',
  },
  closedBadge: {
    backgroundColor: '#450a0a',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  openText: {
    color: '#34d399',
  },
  closedText: {
    color: '#f87171',
  },
  address: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  distanceChip: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  distanceText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

