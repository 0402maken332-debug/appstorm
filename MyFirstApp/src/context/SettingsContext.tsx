import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { fontMultipliers, themes, type AppTheme } from '../theme/themes';
import type { FontScale, Settings, ThemeMode } from '../types/settings';
import { defaultSettings, parseSettings, SETTINGS_STORAGE_KEY } from '../utils/settings';

type StorageStatus = 'idle' | 'saving' | 'saved' | 'error';
type SettingsContextValue = Settings & {
  colors: AppTheme;
  fontMultiplier: number;
  isReady: boolean;
  storageStatus: StorageStatus;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  resetSettings: () => void;
  retrySave: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [initial] = useState(() => defaultSettings(systemTheme === 'dark' ? 'dark' : 'light'));
  const [settings, setSettings] = useState<Settings>(initial);
  const [isReady, setIsReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [storageStatus, setStorageStatus] = useState<StorageStatus>('idle');
  const writeQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        const restored = saved ? parseSettings(saved, initial) : initial;
        if (active) setSettings(restored);
      } catch {
        if (active) setStorageStatus('error');
      } finally {
        if (active) setIsReady(true);
      }
    }
    void load();
    return () => { active = false; };
  }, [initial]);

  useEffect(() => {
    // Do not overwrite stored preferences before hydration or after a failed read.
    if (!isReady || revision === 0) return;
    let active = true;
    const serialized = JSON.stringify(settings);
    // Serialize writes so rapid selections cannot persist in the wrong order.
    writeQueue.current = writeQueue.current
      .catch(() => {})
      .then(() => AsyncStorage.setItem(SETTINGS_STORAGE_KEY, serialized))
      .then(() => { if (active) setStorageStatus('saved'); })
      .catch(() => { if (active) setStorageStatus('error'); });
    return () => { active = false; };
  }, [settings, isReady, revision]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings(current => ({ ...current, ...patch }));
    setStorageStatus('saving');
    setRevision(current => current + 1);
  }, []);
  const setTheme = useCallback((theme: ThemeMode) => update({ theme }), [update]);
  const setFontScale = useCallback((fontScale: FontScale) => update({ fontScale }), [update]);
  const resetSettings = useCallback(() => update(defaultSettings(systemTheme === 'dark' ? 'dark' : 'light')), [systemTheme, update]);
  const retrySave = useCallback(() => update({}), [update]);
  const value = useMemo<SettingsContextValue>(() => ({
    ...settings, colors: themes[settings.theme], fontMultiplier: fontMultipliers[settings.fontScale],
    isReady, storageStatus, setTheme, setFontScale, resetSettings, retrySave,
  }), [settings, isReady, storageStatus, setTheme, setFontScale, resetSettings, retrySave]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be inside SettingsProvider');
  return value;
}
