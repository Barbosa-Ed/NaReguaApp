import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

type RouteProps = RouteProp<RootStackParamList, 'RateBarber'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const RateBarberScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { appointmentId, professionalId, professionalName, barbershopId } = route.params;
  const { currentUser, addReview } = useAuth();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      Alert.alert('Atenção', 'Selecione uma nota de 1 a 5 estrelas.');
      return;
    }

    addReview({
      appointmentId,
      barbershopId,
      professionalId,
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientAvatarUrl: currentUser.avatarUrl,
      rating,
      comment: comment.trim() || undefined,
    });

    Alert.alert(
      'Avaliação Enviada! 💈',
      `Obrigado por avaliar o atendimento do barbeiro ${professionalName}! Sua avaliação ajuda outros clientes e valoriza o profissional.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>✕ Fechar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar Barbeiro</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarIcon}>✂️</Text>
        </View>

        <Text style={styles.barberName}>{professionalName}</Text>
        <Text style={styles.subtext}>Como foi a sua experiência com o corte e atendimento?</Text>

        {/* Stars Selector */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7}
              style={styles.starTouch}
            >
              <Text style={[styles.starIcon, rating >= star ? styles.starFilled : styles.starEmpty]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingLabel}>
          {rating === 5 && 'Excepcional! 🔥'}
          {rating === 4 && 'Muito bom! 👍'}
          {rating === 3 && 'Bom 🙂'}
          {rating === 2 && 'Poderia melhorar 😐'}
          {rating === 1 && 'Ruim 👎'}
        </Text>

        {/* Comment Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Deixe um comentário (opcional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex: Corte impecável, degradê bem feito e pontual..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Enviar Avaliação ⭐</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    padding: 6,
  },
  backBtnText: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarIcon: {
    fontSize: 32,
  },
  barberName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  starTouch: {
    padding: 4,
  },
  starIcon: {
    fontSize: 42,
  },
  starFilled: {
    color: '#fbbf24',
  },
  starEmpty: {
    color: '#334155',
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentLight,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    color: colors.textPrimary,
    fontSize: 14,
    textAlignVertical: 'top',
    height: 100,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

