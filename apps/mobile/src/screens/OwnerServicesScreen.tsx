import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { BarbershopService } from '@naregua/shared';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const OwnerServicesScreen: React.FC = () => {
  const { services, addService, updateService, deleteService } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [durationStr, setDurationStr] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openCreateModal = () => {
    setEditingServiceId(null);
    setName('');
    setDescription('');
    setPriceStr('');
    setDurationStr('30');
    setIsActive(true);
    setModalVisible(true);
  };

  const openEditModal = (service: BarbershopService) => {
    setEditingServiceId(service.id);
    setName(service.name);
    setDescription(service.description || '');
    setPriceStr((service.priceCents / 100).toFixed(2));
    setDurationStr(service.durationMinutes.toString());
    setIsActive(service.isActive);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do serviço.');
      return;
    }

    const priceCents = Math.round(parseFloat(priceStr.replace(',', '.')) * 100);
    if (isNaN(priceCents) || priceCents <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para o serviço.');
      return;
    }

    const durationMinutes = parseInt(durationStr, 10);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      Alert.alert('Erro', 'Insira uma duração válida em minutos.');
      return;
    }

    if (editingServiceId) {
      updateService(editingServiceId, {
        name: name.trim(),
        description: description.trim() || undefined,
        priceCents,
        durationMinutes,
        isActive,
      });
      Alert.alert('Sucesso', 'Serviço atualizado com sucesso!');
    } else {
      addService({
        name: name.trim(),
        description: description.trim() || undefined,
        priceCents,
        durationMinutes,
        isActive,
      });
      Alert.alert('Sucesso', 'Novo serviço cadastrado no catálogo!');
    }

    setModalVisible(false);
  };

  const handleDelete = (id: string, serviceName: string) => {
    Alert.alert(
      'Remover Serviço',
      `Tem certeza que deseja remover o serviço "${serviceName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            deleteService(id);
            Alert.alert('Removido', 'Serviço excluído.');
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
            <Text style={styles.title}>Catálogo de Serviços</Text>
            <Text style={styles.subtitle}>Gerencie serviços, preços e durações</Text>
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={openCreateModal}>
            <Text style={styles.addBtnText}>+ Novo</Text>
          </TouchableOpacity>
        </View>

        {/* Services List */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  {item.description ? (
                    <Text style={styles.serviceDesc}>{item.description}</Text>
                  ) : null}
                </View>

                <View style={[styles.statusBadge, item.isActive ? styles.activeBadge : styles.inactiveBadge]}>
                  <Text style={[styles.statusText, item.isActive ? styles.activeText : styles.inactiveText]}>
                    {item.isActive ? 'ATIVO' : 'PAUSADO'}
                  </Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.durationText}>⏱ {item.durationMinutes} minutos</Text>
                <Text style={styles.priceText}>
                  R$ {(item.priceCents / 100).toFixed(2).replace('.', ',')}
                </Text>
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id, item.name)}
                >
                  <Text style={styles.deleteBtnText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => openEditModal(item)}
                >
                  <Text style={styles.editBtnText}>Editar Serviço ✎</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum serviço cadastrado.</Text>
            </View>
          }
        />

        {/* Modal: Criar / Editar Serviço */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingServiceId ? 'Editar Serviço' : 'Novo Serviço'}
              </Text>

              <Text style={styles.inputLabel}>Nome do Serviço</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ex: Corte Degradê Navalhado"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.inputLabel}>Descrição (opcional)</Text>
              <TextInput
                style={[styles.textInput, { height: 64 }]}
                placeholder="Ex: Inclui lavagem e finalização com pomada"
                placeholderTextColor={colors.textMuted}
                multiline
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.rowInputs}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Preço (R$)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="45.00"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="decimal-pad"
                    value={priceStr}
                    onChangeText={setPriceStr}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Duração (minutos)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="30"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="number-pad"
                    value={durationStr}
                    onChangeText={setDurationStr}
                  />
                </View>
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Disponível para agendamento</Text>
                <Switch
                  value={isActive}
                  onValueChange={setIsActive}
                  trackColor={{ false: '#334155', true: '#0284c7' }}
                  thumbColor={isActive ? '#38bdf8' : '#94a3b8'}
                />
              </View>

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSave}>
                  <Text style={styles.modalSaveText}>Salvar Serviço</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    marginBottom: 20,
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
  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  addBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 24,
  },
  serviceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  serviceDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeBadge: {
    backgroundColor: '#064e3b',
  },
  inactiveBadge: {
    backgroundColor: '#3f3f46',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  activeText: {
    color: '#34d399',
  },
  inactiveText: {
    color: '#a1a1aa',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  durationText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  priceText: {
    color: colors.primaryLight,
    fontSize: 16,
    fontWeight: '800',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    paddingTop: 6,
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7f1d1d',
  },
  deleteBtnText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  editBtnText: {
    color: colors.primaryLight,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  switchLabel: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalSaveText: {
    color: colors.white,
    fontWeight: '700',
  },
});

