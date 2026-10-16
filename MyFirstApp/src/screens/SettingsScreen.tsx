import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { Screen, screenStyles } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { useSettings } from '../context/SettingsContext';
import type { FontScale } from '../types/settings';

const fontOptions: { value: FontScale; label: string; symbol: string }[] = [
  { value: 'small', label: 'Маленький', symbol: 'A−' },
  { value: 'normal', label: 'Обычный', symbol: 'A' },
  { value: 'large', label: 'Большой', symbol: 'A+' },
];
export default function SettingsScreen() {
  const { colors, theme, fontScale, setTheme, setFontScale, resetSettings, storageStatus, retrySave } = useSettings();
  const cardStyle = [screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }];
  return (
    <Screen>
      <ScreenHeader title="Настройки" subtitle="Сделайте приложение удобным для себя" />
      <View style={cardStyle}>
        <View style={screenStyles.row}>
          <View style={{ flex: 1, gap: 4 }}>
            <AppText size={20} style={screenStyles.title}>Тёмная тема</AppText>
            <AppText muted>{theme === 'dark' ? 'Включена' : 'Выключена, светлая тема'}</AppText>
          </View>
          <Switch accessibilityLabel="Тёмная тема" value={theme === 'dark'} onValueChange={enabled => setTheme(enabled ? 'dark' : 'light')} trackColor={{ false: colors.border, true: colors.primary }} />
        </View>
      </View>
      <View style={cardStyle}>
        <AppText size={20} style={screenStyles.title}>Размер шрифта</AppText>
        <AppText size={14} muted>Применяется на всех экранах</AppText>
        <View style={styles.options}>
          {fontOptions.map(option => {
            const selected = fontScale === option.value;
            return <Pressable key={option.value} accessibilityRole="radio" aria-checked={selected} accessibilityLabel={option.label}
              onPress={() => setFontScale(option.value)} style={[styles.option, { backgroundColor: selected ? colors.tint : colors.card, borderColor: selected ? colors.primary : colors.border }]}>
              <AppText size={22} style={{ color: selected ? colors.primary : colors.text, fontWeight: '700' }}>{option.symbol}</AppText>
              <AppText size={13}>{option.label}</AppText>
            </Pressable>;
          })}
        </View>
      </View>
      <View style={cardStyle}>
        <AppText size={20} style={screenStyles.title}>Предпросмотр</AppText>
        <AppText>Campus Hub всегда под рукой</AppText>
        <AppText size={14} muted>Цвета и размер текста обновляются сразу на главной, в сервисах и профиле.</AppText>
      </View>
      <View aria-live="polite" style={{ gap: 12 }}>
        <AppText size={14} muted style={storageStatus === 'error' ? { color: colors.danger } : undefined}>
          {storageStatus === 'saving' ? 'Сохраняем настройки…' : storageStatus === 'error'
            ? 'Не удалось прочитать или сохранить настройки. Проверьте доступ к хранилищу и повторите.'
            : storageStatus === 'saved' ? 'Настройки сохранены на устройстве' : 'Настройки сохраняются на этом устройстве автоматически'}
        </AppText>
        {storageStatus === 'error' && <AppButton title="Повторить сохранение" variant="secondary" onPress={retrySave} />}
      </View>
      <AppButton title="Сбросить настройки" variant="secondary" onPress={resetSettings} />
      <AppText size={13} muted>Сброс восстановит системную тему устройства и обычный размер шрифта.</AppText>
    </Screen>
  );
}
const styles = StyleSheet.create({ options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }, option: { flexGrow: 1, flexBasis: 100, borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 76, alignItems: 'center', justifyContent: 'center', gap: 4 } });
