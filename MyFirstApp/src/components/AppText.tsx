import { Text, type TextProps } from 'react-native';
import { useSettings } from '../context/SettingsContext';

type Props = TextProps & { size?: number; muted?: boolean };

export function AppText({ size = 16, muted = false, style, ...props }: Props) {
  const { colors, fontMultiplier } = useSettings();
  return <Text {...props} style={[{ color: muted ? colors.muted : colors.text, fontSize: size * fontMultiplier, lineHeight: size * fontMultiplier * 1.45 }, style]} />;
}
