export function validateLogin(login: string, password: string): string | null {
  if (!login.trim() || !password.trim()) return 'Заполните логин и пароль';
  if (login.trim().length < 4) return 'Логин должен содержать минимум 4 символа';
  if (password.length < 6) return 'Пароль должен содержать минимум 6 символов';
  return null;
}
