import { Service } from '../types/Service';

export const services: Service[] = [
  { id: '1', icon: 'library-outline', title: 'Библиотека', description: 'Поиск книг и статей', color: '#E8F1FF', badge: '34 места' },
  { id: '2', icon: 'calendar-outline', title: 'Расписание', description: 'Занятия на сегодня', color: '#FFF1D6', badge: '3 пары' },
  { id: '3', icon: 'school-outline', title: 'Moodle', description: 'Курсы и задания', color: '#E7F8EF', badge: '2 новых' },
  { id: '4', icon: 'bus-outline', title: 'Транспорт', description: 'Расписание автобусов', color: '#FDE8F1', badge: '6 мин' },
  { id: '5', icon: 'restaurant-outline', title: 'Столовая', description: 'Меню и часы работы', color: '#FFF4E0', badge: 'Открыто' },
  { id: '6', icon: 'document-text-outline', title: 'Деканат', description: 'Справки и заявления', color: '#EAEAFB', badge: 'Очередь: 3' },
  { id: '7', icon: 'barbell-outline', title: 'Спортзал', description: 'Расписание тренировок', color: '#E2F7F2', badge: 'Открыт' },
  { id: '8', icon: 'medkit-outline', title: 'Медпункт', description: 'Запись к врачу', color: '#FCEAEA', badge: '3 окна' },
];