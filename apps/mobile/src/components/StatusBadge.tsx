import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppointmentStatus } from '@naregua/shared';
import { colors } from '../theme/colors';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending_confirmation':
        return {
          label: 'Aguardando Confirmação (24h/5h)',
          bg: '#451a03',
          border: '#b45309',
          color: '#fbbf24',
        };
      case 'confirmed':
        return {
          label: 'Confirmado',
          bg: '#064e3b',
          border: '#047857',
          color: '#34d399',
        };
      case 'cancelled_by_client':
      case 'cancelled_by_barber':
        return {
          label: 'Cancelado',
          bg: '#450a0a',
          border: '#b91c1c',
          color: '#f87171',
        };
      case 'auto_cancelled_expired':
        return {
          label: 'Expirado (Sem Confirmação)',
          bg: '#3f3f46',
          border: '#71717a',
          color: '#d4d4d8',
        };
      case 'completed':
        return {
          label: 'Concluído',
          bg: '#1e293b',
          border: '#334155',
          color: '#94a3b8',
        };
      default:
        return {
          label: status,
          bg: colors.surfaceElevated,
          border: colors.border,
          color: colors.textPrimary,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: config.border }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

