export type User = {
  id: number;          // уникальный идентификатор
  name: string;        // имя пользователя
  avatarUrl?: string;
  email?: string;      // необязательный email
  role?: 'ADMIN' | 'USER' | 'GUEST'| string; // необязательная роль
}

export interface UserDto{
  projectId: number;
  userId: number;
  userName: string;
  avatarUrl?: string;
  role?: string;
}

