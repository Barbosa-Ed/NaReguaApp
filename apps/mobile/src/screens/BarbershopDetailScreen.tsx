import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  MOCK_BARBERSHOPS,
  MOCK_SERVICES,
  MOCK_PROFESSIONALS,
} from '../services/mockData';
import { colors } from '../theme/colors';

type RouteProps = RouteProp<RootStackParamList, 'BarbershopDetail'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const BarbershopDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { barbershopId } = route.params;

  const [activeTab, setActiveTab] = useState<'services' | 'team'>('services');

  const barbershop =
    MOCK_BARBERSHOPS.find((b) => b.id === barbershopId) || MOCK_BARBERSHOPS[0];
  const services = MOCK_SERVICES[barbershop.id] || MOCK_SERVICES['barber-1'] || [];
  const professionals =
    MOCK_PROFESSIONALS[barbershop.id] || MOCK_PROFESSIONALS['barber-1'] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cover Image & Back Button */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: barbershop.coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
        </View>

        {/* Barbershop Info */}
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{barbershop.name}</Text>
            <View
              style={[
                styles.statusBadge,
                barbershop.isOpen ? styles.openBadge : styles.closedBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  barbershop.isOpen ? styles.openText : styles.closedText,
                ]}
              >
                {barbershop.isOpen ? 'ABERTO' : 'FECHADO'}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{barbershop.description}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>📍 {barbershop.address}</Text>
            <Text style={styles.metaText}>📞 {barbershop.phone}</Text>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'services' && styles.tabItemActive]}
            onPress={() => setActiveTab('services')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'services' && styles.tabTextActive,
              ]}
            >
              Serviços ({services.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'team' && styles.tabItemActive]}
            onPress={() => setActiveTab('team')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'team' && styles.tabTextActive,
              ]}
            >
              Equipe ({professionals.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <View style={styles.tabContent}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                  <View style={styles.serviceDetailsRow}>
                    <Text style={styles.serviceDuration}>
                      ⏱ {service.durationMinutes} min
                    </Text>
                    <Text style={styles.servicePrice}>
                      R$ {(service.priceCents / 100).toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.bookSmallButton}
                  onPress={() =>
                    navigation.navigate('Booking', {
                      barbershopId: barbershop.id,
                      initialServiceId: service.id,
                    })
                  }
                >
                  <Text style={styles.bookSmallButtonText}>Agendar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <View style={styles.tabContent}>
            {professionals.map((prof) => (
              <View key={prof.id} style={styles.profItem}>
                <Image
                  source={{ uri: prof.avatarUrl }}
                  style={styles.profAvatar}
                />
                <View style={styles.profInfo}>
                  <Text style={styles.profName}>{prof.name}</Text>
                  <Text style={styles.profBio}>{prof.bio}</Text>
                  <View style={styles.profRatingRow}>
                    <Text style={styles.profRatingStars}>★ {prof.rating || '4.9'}</Text>
                    <Text style={styles.profRatingCount}>
                      ({prof.reviewCount || 30} avaliações de clientes)
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomBarSubtext}>Agendamento Rápido</Text>
          <Text style={styles.bottomBarText}>Sem pagamento antecipado</Text>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() =>
            navigation.navigate('Booking', {
              barbershopId: barbershop.id,
            })
          }
        >
          <Text style={styles.ctaButtonText}>Agendar Horário ✂️</Text>
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
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: colors.surfaceElevated,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
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
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  metaRow: {
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: colors.primaryLight,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primaryLight,
    fontWeight: '700',
  },
  tabContent: {
    padding: 20,
    paddingBottom: 100,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 16,
  },
  serviceDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceDuration: {
    fontSize: 12,
    color: colors.textMuted,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  bookSmallButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookSmallButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  profItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceElevated,
    marginRight: 14,
  },
  profInfo: {
    flex: 1,
  },
  profName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  profBio: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  profRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profRatingStars: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '800',
  },
  profRatingCount: {
    color: colors.textMuted,
    fontSize: 11,
  },
  bottomBar: {
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
  bottomBarSubtext: {
    fontSize: 11,
    color: colors.textMuted,
  },
  bottomBarText: {
    fontSize: 13,
    color: colors.successLight,
    fontWeight: '700',
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

