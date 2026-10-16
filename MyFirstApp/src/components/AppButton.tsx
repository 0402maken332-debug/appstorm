import { Pressable, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

type Props = { title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger' };

export function AppButton({ title, onPress, variant = 'primary' }: Props) {
  const { colors } = useSettings();
  const backgroundColor = variant === 'primary' ? colors.primary : variant === 'danger' ? colors.dangerBg : colors.tint;
  const color = variant === 'primary' ? colors.onPrimary : variant === 'danger' ? colors.danger : colors.primary;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor, opacity: pressed ? 0.7 : 1 }]}>
      <AppText style={{ color, fontWeight: '700', textAlign: 'center' }}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({ button: { minHeight: 48, padding: 14, borderRadius: 12, justifyContent: 'center' } });
