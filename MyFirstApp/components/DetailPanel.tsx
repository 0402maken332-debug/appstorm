import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Service } from '../types/Service';

type DetailPanelProps = {
  service: Service | null;
  onClose: () => void;
};

const extraInfo: Record<string, string[]> = {
  '1': ['Открыта: 09:00–20:00', 'Свободных мест: 34', 'Бронирование доступно'],
  '2': ['Сегодня: 3 пары', 'Следующая: 10:30, ауд. 204', 'Изменений нет'],
  '3': ['Новых заданий: 2', 'Дедлайн ближайшего: завтра', 'Непрочитанных: 5'],
  '4': ['Маршрут №12 — через 6 мин', 'Маршрут №4 — через 14 мин', 'Актуально'],
  '5': ['Открыта: 08:00–19:00', 'Комплексный обед: 900 ₸', 'Сегодня: плов, суп'],
  '6': ['Приём: пн–пт 09:00–17:00', 'Онлайн-заявка доступна', 'Очередь: 3 человека'],
  '7': ['Открыт: 07:00–22:00', 'Йога сегодня в 18:00', 'Свободно 2 дорожки'],
  '8': ['Врач на месте', 'Запись: сегодня 3 окна', 'Экстренная помощь: 24/7'],
};

export function DetailPanel({ service, onClose }: DetailPanelProps) {
  return (
    <Modal visible={!!service} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          {service && (
            <>
              <View style={[styles.iconBadge, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={26} color="#092B55" />
              </View>

              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.description}>{service.description}</Text>

              <View style={styles.divider} />

              {(extraInfo[service.id] ?? ['Информация уточняется']).map((line, i) => (
                <Text key={i} style={styles.infoLine}>• {line}</Text>
              ))}

              <Pressable style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>Закрыть</Text>
              </Pressable>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'rgba(9, 43, 85, 0.35)' },
  panel: { width: 300, maxWidth: '85%', height: '100%', backgroundColor: '#FFFFFF', padding: 24, paddingTop: 60 },
  iconBadge: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#092B55' },
  description: { fontSize: 14, color: '#52677D', marginTop: 6, lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 16 },
  infoLine: { fontSize: 14, color: '#425466', marginBottom: 8, lineHeight: 20 },
  closeBtn: { marginTop: 'auto', backgroundColor: '#0B66E4', padding: 14, borderRadius: 12, alignItems: 'center' },
  closeText: { color: '#FFFFFF', fontWeight: '700' },
});