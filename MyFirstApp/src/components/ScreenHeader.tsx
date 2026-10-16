import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

type Props = { title: string; subtitle?: string; back?: boolean };

export function ScreenHeader({ title, subtitle, back }: Props) {
  const { colors } = useSettings();
  return (
    <View style={styles.row}>
      {back && <Pressable accessibilityRole="button" accessibilityLabel="Назад" style={[styles.back, { backgroundColor: colors.tint }]} onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </Pressable>}
      <View style={{ flex: 1 }}>
        <AppText size={26} accessibilityRole="header" style={{ fontWeight: '800' }}>{title}</AppText>
        {subtitle && <AppText muted style={{ marginTop: 4 }}>{subtitle}</AppText>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 12, alignItems: 'center' }, back: { minWidth: 48, minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' } });
