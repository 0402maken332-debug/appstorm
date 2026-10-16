import type Ionicons from '@expo/vector-icons/Ionicons';

export type Service = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap; // строгая типизация имени иконки
  title: string;
  description: string;
  color: string;
  badge: string;
};
