import type { PropsWithChildren } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { SettingsProvider } from './src/context/SettingsContext';

// Expo Router owns the entry point; this shell provides shared app state.
export default function App({ children }: PropsWithChildren) {
  return <SettingsProvider><AuthProvider>{children}</AuthProvider></SettingsProvider>;
}
