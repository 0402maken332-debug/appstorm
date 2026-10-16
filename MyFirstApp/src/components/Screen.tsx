import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { spacing } from '../theme/themes';

export function Screen({ children }: PropsWithChildren) {
  const { colors } = useSettings();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </SafeAreaView>
  );
}

export const screenStyles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: 40, gap: spacing.lg, width: '100%', maxWidth: 900, alignSelf: 'center' },
  card: { borderWidth: 1, borderRadius: 18, padding: spacing.md, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { fontWeight: '800' },
});
const styles = screenStyles;
