import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { Screen, screenStyles } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { colors, theme, fontScale } = useSettings();
  return (
    <Screen>
      <ScreenHeader title="Профиль" subtitle="Ваша учётная запись" />
      <View style={[screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="person-circle-outline" size={64} color={colors.primary} />
        <AppText size={24} style={screenStyles.title}>{user}</AppText>
        <AppText muted>Студент · Campus Hub</AppText>
        <AppText size={14} muted>Учебная учётная запись действует до закрытия приложения или выхода.</AppText>
      </View>
      <View style={[screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <AppText size={20} style={screenStyles.title}>Мои настройки</AppText>
        <AppText>Тема: {theme === 'dark' ? 'тёмная' : 'светлая'}</AppText>
        <AppText>Размер текста: {{ small: 'маленький', normal: 'обычный', large: 'большой' }[fontScale]}</AppText>
        <AppButton title="Открыть настройки" variant="secondary" onPress={() => router.navigate('/settings')} />
      </View>
      <AppButton title="Выйти из аккаунта" variant="danger" onPress={signOut} />
    </Screen>
  );
}
