import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LoginCard } from './components/LoginCard';
import { ServiceCard } from './components/ServiceCard';
import { DetailPanel } from './components/DetailPanel';
import { services } from './data/services';
import { Service } from './types/Service';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  const { width } = useWindowDimensions();

  if (!user) {
    return <LoginCard onSuccess={setUser} />;
  }

  const columns = width >= 700 ? 3 : 2;
  const screenPadding = 20;
  const gap = 12;
  const contentWidth = width - screenPadding * 2;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;

  const handleLogout = () => {
    setSelected(null); // на всякий случай закрываем открытую панель
    setUser(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcome}>Добро пожаловать, {user}</Text>
            <Text style={styles.subtitle}>Выберите нужный сервис</Text>
          </View>

          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#D9342B" />
          </Pressable>
        </View>

        <View style={styles.grid}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              width={cardWidth}
              onPress={() => setSelected(service)}
            />
          ))}
        </View>
      </ScrollView>

      <DetailPanel service={selected} onClose={() => setSelected(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F8FC' },
  container: { padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcome: { paddingTop: 24, fontSize: 20, fontWeight: '800', color: '#092B55' },
  subtitle: { fontSize: 16, color: '#60758A', marginTop: 6 },
  logoutBtn: {
    width: 40,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FCEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});