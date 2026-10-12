import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { APPOINTMENT_RULES } from '@naregua/shared';
import { colors } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  const { userRole, switchRole, currentUser } = useAuth();

  const handleRoleToggle = () => {
    const nextRole = userRole === 'client' ? 'owner' : 'client';
    switchRole(nextRole);
    Alert.alert(
      'Visão Alterada',
      `Você agora está na visão de: ${
        nextRole === 'client'
          ? 'Cliente (Explorar barbearias & Meus Agendamentos)'
          : 'Dono da Barbearia (Agenda do dia, Gestão de Serviços & Perfil)'
      }`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Perfil</Text>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUser.name}</Text>
            <Text style={styles.userEmail}>{currentUser.email}</Text>
            <Text style={styles.userPhone}>{currentUser.phone}</Text>
          </View>
        </View>

        {/* Role Switcher */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Acesso (Perfil)</Text>
          <TouchableOpacity style={styles.roleCard} onPress={handleRoleToggle}>
            <View style={{ flex: 1 }}>
              <Text style={styles.roleLabel}>Papel Ativo na Aplicação:</Text>
              <Text style={styles.roleValue}>
                {userRole === 'client'
                  ? '👤 Cliente (Ver barbearias e agendar)'
                  : '💈 Dono de Barbearia (Gerenciar agenda e serviços)'}
              </Text>
            </View>
            <Text style={styles.switchButton}>Mudar ⇄</Text>
          </TouchableOpacity>
        </View>

        {/* Informações das Regras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regras da Plataforma</Text>
          <View style={styles.rulesCard}>
            <Text style={styles.ruleItem}>
              • Lembrete de confirmação de presença: {APPOINTMENT_RULES.CONFIRMATION_REMINDER_HOURS_BEFORE}h antes
            </Text>
            <Text style={styles.ruleItem}>
              • Liberação automática de vaga se não confirmado: {APPOINTMENT_RULES.AUTO_CANCEL_HOURS_BEFORE}h antes
            </Text>
            <Text style={styles.ruleItem}>
              • Lembrete final de trajeto: {APPOINTMENT_RULES.FINAL_REMINDER_HOURS_BEFORE}h antes
            </Text>
            <Text style={styles.ruleItem}>
              • Cadastro gratuito para barbearias (self-service)
            </Text>
          </View>
        </View>

        {/* App Version & Logout */}
        <View style={styles.footerSection}>
          <Text style={styles.versionText}>NaRégua App v1.0.0 (MVP)</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => Alert.alert('Sair', 'Sessão encerrada com sucesso.')}
          >
            <Text style={styles.logoutBtnText}>Sair da Conta</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: colors.surfaceElevated,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 13,
    color: colors.textMuted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  roleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  roleValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  switchButton: {
    color: colors.primaryLight,
    fontWeight: '700',
    fontSize: 13,
  },
  rulesCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  ruleItem: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  versionText: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 16,
  },
  logoutBtn: {
    width: '100%',
    backgroundColor: '#261214',
    borderWidth: 1,
    borderColor: '#7f1d1d',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 14,
  },
});

