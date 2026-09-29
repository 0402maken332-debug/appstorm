import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type LoginCardProps = {
  onSuccess: (login: string) => void;
};

export function LoginCard({ onSuccess }: LoginCardProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!login.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }
    if (login.trim().length < 4) {
      setError('Логин должен содержать минимум 4 символа');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    setError('');
    onSuccess(login.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Campus Hub</Text>
        <Text style={styles.hint}>Введите данные для входа</Text>

        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Логин"
          autoCapitalize="none"
          value={login}
          onChangeText={(text) => {
            setLogin(text);
            setError('');
          }}
        />

        <View style={[styles.passwordRow, error && styles.inputError]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Пароль"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
          />
          <Pressable onPress={() => setShowPassword((v) => !v)}>
            <Text style={styles.showText}>{showPassword ? 'Скрыть' : 'Показать'}</Text>
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Войти</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', backgroundColor: '#F4F8FC', padding: 20 },
  loginCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 22 },
  loginTitle: { fontSize: 26, fontWeight: '800', color: '#092B55' },
  hint: { fontSize: 14, color: '#60758A', marginTop: 6, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#C7D7E8', padding: 14, borderRadius: 12, marginBottom: 12 },
  inputError: { borderColor: '#D9342B' },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7D7E8',
    borderRadius: 12,
    marginBottom: 12,
  },
  passwordInput: { flex: 1, padding: 14 },
  showText: { color: '#0B66E4', fontWeight: '700', paddingHorizontal: 14 },
  error: { color: '#D9342B', marginTop: -4, marginBottom: 8 },
  loginButton: { backgroundColor: '#0B66E4', padding: 15, borderRadius: 12, marginTop: 4 },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700' },
});