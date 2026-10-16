import { View } from 'react-native';
import type { Course } from '../types/Course';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { screenStyles } from './Screen';

export default function CourseCard({ course }: { course: Course }) {
  const { colors } = useSettings();
  return (
    <View style={[screenStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <AppText size={18} style={{ fontWeight: '700' }}>{course.title}</AppText>
      <AppText size={14} muted>Преподаватель: {course.teacher}</AppText>
      <AppText size={14} style={{ color: colors.primary }}>{course.credits} кредитов · {course.shift === 'day' ? 'Дневная группа' : 'Вечерняя группа'}</AppText>
    </View>
  );
}
