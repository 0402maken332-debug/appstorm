import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Service } from '../types/Service';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

type ServiceCardProps = { service: Service; onPress: (service: Service) => void };

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  const { colors, theme } = useSettings();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${service.title}. ${service.description}`} onPress={() => onPress(service)}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}>
      <View style={styles.topRow}>
        <View style={[styles.icon, { backgroundColor: theme === 'light' ? service.color : colors.tint }]}>
          <Ionicons name={service.icon} size={26} color={colors.primary} />
        </View>
        <AppText size={12} muted style={{ flexShrink: 1, textAlign: 'right' }}>{service.badge}</AppText>
      </View>
      <View style={{ gap: 4 }}>
        <AppText size={18} style={{ fontWeight: '700' }}>{service.title}</AppText>
        <AppText size={14} muted>{service.description}</AppText>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 16, minHeight: 180, gap: 20, flex: 1 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  icon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
