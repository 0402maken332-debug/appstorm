export type Course = {
  id: string;
  title: string;
  teacher: string;
  credits: number;
  shift: 'day' | 'night';
};