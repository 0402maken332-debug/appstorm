import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText } from '../components/AppText';
import { ScreenHeader } from '../components/ScreenHeader';
import { ServiceCard } from '../components/ServiceCard';
import { useSettings } from '../context/SettingsContext';
import { services } from '../data/services';
import { serviceHref } from '../types/navigation';

export default function ServicesScreen() {
  const { colors, fontMultiplier } = useSettings();
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const columns = width >= 760 ? 3 : width >= 380 && fontMultiplier <= 1 ? 2 : 1;
  const filtered = services.filter(service => `${service.title} ${service.description}`.toLocaleLowerCase('ru').includes(search.trim().toLocaleLowerCase('ru')));
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList key={columns} data={filtered} numColumns={columns} keyExtractor={item => item.id} keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content} columnWrapperStyle={columns > 1 ? styles.columns : undefined}
        ListHeaderComponent={<View style={{ gap: 20, marginBottom: 20 }}>
          <ScreenHeader title="Сервисы" subtitle="Всё, что нужно в кампусе" />
          <TextInput accessibilityLabel="Поиск сервисов" placeholder="Найти сервис" placeholderTextColor={colors.muted}
            style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontSize: 16 * fontMultiplier }]}
            value={search} onChangeText={setSearch} returnKeyType="search" />
        </View>}
        renderItem={({ item }) => <View style={{ flex: 1 }}><ServiceCard service={item} onPress={service => router.push(serviceHref(service))} /></View>}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={<AppText muted>Ничего не найдено. Попробуйте другой запрос.</AppText>}
        ListFooterComponent={<AppText size={13} muted style={{ marginTop: 20 }}>Демонстрационные данные Campus Hub</AppText>} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40, width: '100%', maxWidth: 900, alignSelf: 'center' },
  columns: { gap: 12 }, search: { borderWidth: 1, borderRadius: 12, minHeight: 48, padding: 14 },
});
