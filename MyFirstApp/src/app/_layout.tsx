import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from '../../App';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

void SplashScreen.preventAutoHideAsync().catch(() => {});

function RootNavigator() {
  const { user } = useAuth();
  const { isReady, colors, theme } = useSettings();
  const [fontsLoaded, fontError] = useFonts(Ionicons.font);
  const ready = isReady && (fontsLoaded || !!fontError);

  useEffect(() => {
    if (ready) SplashScreen.hide();
  }, [ready]);

  if (!ready) return null;
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <ThemeProvider value={{ ...navigationTheme, colors: { ...navigationTheme.colors, background: colors.background, card: colors.card, text: colors.text, primary: colors.primary, border: colors.border } }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="details/[serviceId]" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <SafeAreaProvider><App><RootNavigator /></App></SafeAreaProvider>;
}
