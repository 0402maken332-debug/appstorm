import { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { Screen, screenStyles } from '../components/Screen';
import { validateLogin } from '../utils/login';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { colors, fontMultiplier } = useSettings();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const passwordInput = useRef<TextInput>(null);
  const submit = () => {
    const validation = validateLogin(login, password);
    setError(validation);
    if (!validation) signIn(login);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <View style={styles.brand}>
          <View style={[styles.logo, { backgroundColor: colors.tint }]}><Ionicons name="school-outline" size={40} color={colors.primary} /></View>
          <AppText size={32} accessibilityRole="header" style={screenStyles.title}>Campus Hub</AppText>
          <AppText muted>Всё для жизни в кампусе</AppText>
        </View>
        <View style={[screenStyles.card, styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <AppText size={24} style={screenStyles.title}>Добро пожаловать</AppText>
          <AppText size={14} muted>Войдите, чтобы открыть сервисы кампуса</AppText>
          <AppText style={{ fontWeight: '600' }}>Логин</AppText>
          <TextInput accessibilityLabel="Логин" placeholder="Минимум 4 символа" placeholderTextColor={colors.muted}
            style={[styles.input, { color: colors.text, fontSize: 16 * fontMultiplier, borderColor: error ? colors.danger : colors.border }]}
            value={login} autoCapitalize="none" autoCorrect={false} textContentType="username" returnKeyType="next"
            onChangeText={value => { setLogin(value); setError(null); }} onSubmitEditing={() => passwordInput.current?.focus()} />
          <AppText style={{ fontWeight: '600' }}>Пароль</AppText>
          <View style={[styles.password, { borderColor: error ? colors.danger : colors.border }]}>
            <TextInput ref={passwordInput} accessibilityLabel="Пароль" placeholder="Минимум 6 символов" placeholderTextColor={colors.muted}
              style={[styles.passwordInput, { color: colors.text, fontSize: 16 * fontMultiplier }]} secureTextEntry={!showPassword}
              value={password} autoCapitalize="none" autoCorrect={false} textContentType="password" returnKeyType="go"
              onChangeText={value => { setPassword(value); setError(null); }} onSubmitEditing={submit} />
            <Pressable accessibilityRole="button" accessibilityLabel={showPassword ? 'Скрыть пароль' : 'Показать пароль'} onPress={() => setShowPassword(value => !value)} style={styles.eye}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={colors.primary} />
            </Pressable>
          </View>
          {error && <AppText accessibilityRole="alert" size={14} style={{ color: colors.danger }}>{error}</AppText>}
          <AppButton title="Войти" onPress={submit} />
          <AppText size={13} muted>Учебный вход: любой логин от 4 символов и пароль от 6 символов. Данные не отправляются на сервер.</AppText>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  brand: { alignItems: 'center', gap: 8, paddingTop: 24 },
  logo: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  form: { width: '100%', maxWidth: 460, alignSelf: 'center', gap: 12, padding: 24 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, minHeight: 50 },
  password: { borderWidth: 1, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1, minWidth: 0, padding: 14, minHeight: 50 },
  eye: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
});
