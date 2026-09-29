import { View, Text, StyleSheet, Pressable } from 'react-native';

type ThemeColors = {
  cardBg: string;
  titleColor: string;
  textColor: string;
  badgeColor: string;
};

type CourseCardProps = {
  title: string;
  teacher: string;
  credits: number;
  onDelete?: () => void;
  theme: ThemeColors;
};

export default function CourseCard({ title, teacher, credits, onDelete, theme }: CourseCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: theme.titleColor }]}>{title}</Text>
        <Text style={[styles.text, { color: theme.textColor }]}>Преподаватель: {teacher}</Text>
        <Text style={[styles.badge, { color: theme.badgeColor }]}>{credits} кредитов</Text>
      </View>
      {onDelete && (
        <Pressable onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textBlock: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700' },
  text: { marginTop: 8, fontSize: 16 },
  badge: { marginTop: 12, fontWeight: '700' },
  deleteBtn: { padding: 6, marginLeft: 8 },
  deleteText: { fontSize: 18, color: '#D64545', fontWeight: '700' },
});