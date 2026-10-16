import { router } from 'expo-router';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { user } = useAuth();
  return <Screen>
    <ScreenHeader title="Страница не найдена" />
    <AppText muted>Проверьте ссылку или вернитесь в приложение.</AppText>
    <AppButton title={user ? 'На главную' : 'Ко входу'} onPress={() => router.replace(user ? '/' : '/login')} />
  </Screen>;
}
