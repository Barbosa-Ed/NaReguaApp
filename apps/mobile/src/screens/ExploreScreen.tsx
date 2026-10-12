import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MOCK_BARBERSHOPS } from '../services/mockData';
import { BarbershopCard } from '../components/BarbershopCard';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredBarbershops = MOCK_BARBERSHOPS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());
    const matchesOpen = filterOpenOnly ? item.isOpen : true;
    return matchesSearch && matchesOpen;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>💈 NaRégua</Text>
            <Text style={styles.subtitle}>Encontre barbearias próximas</Text>
          </View>

          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
              onPress={() => setViewMode('list')}
            >
              <Text style={[styles.toggleBtnText, viewMode === 'list' && styles.toggleBtnTextActive]}>
                Lista
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, viewMode === 'map' && styles.toggleBtnActive]}
              onPress={() => setViewMode('map')}
            >
              <Text style={[styles.toggleBtnText, viewMode === 'map' && styles.toggleBtnTextActive]}>
                Mapa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou endereço..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={[styles.chip, !filterOpenOnly && styles.chipActive]}
            onPress={() => setFilterOpenOnly(false)}
          >
            <Text style={[styles.chipText, !filterOpenOnly && styles.chipTextActive]}>
              Todas ({MOCK_BARBERSHOPS.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.chip, filterOpenOnly && styles.chipActive]}
            onPress={() => setFilterOpenOnly(true)}
          >
            <Text style={[styles.chipText, filterOpenOnly && styles.chipTextActive]}>
              🟢 Abertas Agora
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content: List or Map View */}
        {viewMode === 'list' ? (
          <FlatList
            data={filteredBarbershops}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BarbershopCard
                barbershop={item}
                onPress={() =>
                  navigation.navigate('BarbershopDetail', { barbershopId: item.id })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Nenhuma barbearia encontrada</Text>
                <Text style={styles.emptySubtitle}>Tente ajustar os termos da sua busca.</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.mapMockContainer}>
            <View style={styles.mapRadar}>
              <Text style={styles.mapRadarIcon}>📍</Text>
              <Text style={styles.mapRadarText}>Geolocalização Ativa</Text>
              <Text style={styles.mapRadarSubtext}>
                Exibindo barbearias em um raio de 10 km
              </Text>
            </View>

            <View style={styles.mapPinList}>
              {filteredBarbershops.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.mapPinItem}
                  onPress={() =>
                    navigation.navigate('BarbershopDetail', { barbershopId: item.id })
                  }
                >
                  <Text style={styles.mapPinName}>💈 {item.name}</Text>
                  <Text style={styles.mapPinDistance}>
                    {item.distanceKm ? `${item.distanceKm} km` : 'Próximo'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  toggleBtnActive: {
    backgroundColor: colors.primary,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleBtnTextActive: {
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  clearIcon: {
    color: colors.textMuted,
    fontSize: 16,
    padding: 4,
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.primaryLight,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.primaryLight,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  mapMockContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  mapRadar: {
    alignItems: 'center',
    marginTop: 20,
  },
  mapRadarIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  mapRadarText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  mapRadarSubtext: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  mapPinList: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  mapPinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapPinName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  mapPinDistance: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '700',
  },
});

