export type User = {
  id: number;          // уникальный идентификатор
  name: string;        // имя пользователя
  email: string;      // необязательный email
  role?: 'ADMIN' | 'USER' | 'GUEST'; // необязательная роль
}