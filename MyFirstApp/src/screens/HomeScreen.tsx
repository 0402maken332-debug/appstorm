import { router } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { Screen, screenStyles } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { ServiceCard } from '../components/ServiceCard';
import CourseCard from '../components/CourseCard';
import { services } from '../data/services';
import { courses } from '../data/courses';
import { serviceHref } from '../types/navigation';

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors } = useSettings();
  return (
    <Screen>
      <ScreenHeader title="Campus Hub" subtitle={`Добро пожаловать, ${user}`} />
      <View style={[screenStyles.card, { backgroundColor: colors.tint, borderColor: colors.border }]}>
        <AppText size={22} style={screenStyles.title}>Ваш кампус рядом</AppText>
        <AppText muted>Расписание, учебные материалы и полезные сервисы в одном месте.</AppText>
        <AppButton title="Все сервисы" onPress={() => router.navigate('/services')} />
      </View>
      <AppText size={21} accessibilityRole="header" style={screenStyles.title}>Быстрый доступ</AppText>
      {services.slice(0, 2).map(service => <ServiceCard key={service.id} service={service} onPress={item => router.push(serviceHref(item))} />)}
      <AppText size={21} accessibilityRole="header" style={screenStyles.title}>Мои курсы</AppText>
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
      <AppText size={13} muted>Учебный проект. Информация о сервисах приведена для демонстрации.</AppText>
    </Screen>
  );
}
