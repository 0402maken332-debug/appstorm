import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { Screen, screenStyles } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { useSettings } from '../context/SettingsContext';
import { services } from '../data/services';
import { serviceDetails } from '../data/serviceDetails';
import type { DetailsParams } from '../types/navigation';

export default function DetailsScreen() {
  const { serviceId } = useLocalSearchParams<DetailsParams>();
  const { colors } = useSettings();
  const service = typeof serviceId === 'string' ? services.find(item => item.id === serviceId) : undefined;
  if (!service) return <Screen>
    <ScreenHeader title="Сервис не найден" back />
    <AppText muted>Такого сервиса нет. Выберите его в каталоге.</AppText>
    <AppButton title="К сервисам" onPress={() => router.replace('/services')} />
  </Screen>;
  return (
    <Screen>
      <ScreenHeader title={service.title} subtitle={`Сервис №${service.id}`} back />
      <View style={[screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name={service.icon} size={48} color={colors.primary} />
        <AppText size={22} style={screenStyles.title}>{service.title}</AppText>
        <AppText muted>{service.description}</AppText>
        <AppText style={{ color: colors.primary, fontWeight: '700' }}>{service.badge}</AppText>
      </View>
      <AppText size={20} style={screenStyles.title}>Полезная информация</AppText>
      {(serviceDetails[service.id] ?? ['Информация уточняется']).map(line => <View key={line} style={[screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}><AppText>{line}</AppText></View>)}
      <AppText size={13} muted>Демонстрационные данные для лабораторной работы.</AppText>
      <AppButton title="Назад" variant="secondary" onPress={() => router.canGoBack() ? router.back() : router.replace('/services')} />
    </Screen>
  );
}
