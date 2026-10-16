import type { Settings, ThemeMode } from '../types/settings';

export const SETTINGS_STORAGE_KEY = '@campus_hub_settings';

export function defaultSettings(systemTheme: ThemeMode): Settings {
  return { theme: systemTheme, fontScale: 'normal' };
}

// Storage is untrusted input: restore only supported values.
export function parseSettings(raw: string, defaults: Settings): Settings {
  const value: unknown = JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;
  const saved = value as Record<string, unknown>;
  return {
    theme: saved.theme === 'light' || saved.theme === 'dark' ? saved.theme : defaults.theme,
    fontScale: saved.fontScale === 'small' || saved.fontScale === 'normal' || saved.fontScale === 'large'
      ? saved.fontScale : defaults.fontScale,
  };
}
