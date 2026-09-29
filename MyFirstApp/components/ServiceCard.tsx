import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Service } from '../types/Service';

type CardProps = {
  service: Service;
  width: number;
  onPress: () => void;
};

export function ServiceCard({ service, width, onPress }: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { width, backgroundColor: service.color, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View style={styles.topRow}>
        <Ionicons name={service.icon} size={28} color="#092B55" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{service.badge}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.cardTitle}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 170,
    padding: 16,
    borderRadius: 18,
    justifyContent: 'space-between',
    shadowColor: '#092B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: 'rgba(9, 43, 85, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#092B55' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#092B55' },
  description: { fontSize: 14, lineHeight: 20, color: '#52677D' },
});