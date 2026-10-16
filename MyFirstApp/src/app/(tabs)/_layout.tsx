import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../../context/SettingsContext';
import { AppText } from '../../components/AppText';

const tabs = [
  { name: 'index', title: 'Главная', icon: 'home-outline' },
  { name: 'services', title: 'Сервисы', icon: 'grid-outline' },
  { name: 'profile', title: 'Профиль', icon: 'person-outline' },
  { name: 'settings', title: 'Настройки', icon: 'settings-outline' },
] as const;

export default function MainTabs() {
  const { colors } = useSettings();
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted,
      tabBarHideOnKeyboard: true, tabBarLabelPosition: 'below-icon',
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 70 + insets.bottom, paddingBottom: Math.max(insets.bottom, 8), paddingTop: 8 } }}>
      {tabs.map(tab => <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title,
        tabBarLabel: ({ color }) => <AppText size={11} style={{ color, fontWeight: '600' }}>{tab.title}</AppText>,
        tabBarIcon: ({ color, size }) => <Ionicons name={tab.icon} size={size} color={color} /> }} />)}
    </Tabs>
  );
}
