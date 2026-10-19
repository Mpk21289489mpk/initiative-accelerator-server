// api/get_me.ts
import type { NextApiRequest, NextApiResponse } from 'next'; // этот импорт можно оставить даже на чистом Vercel Functions — он не сломает сборку

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Разрешаем только GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Извлекаем токен из заголовка Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const tokenPart = authHeader.split(' ');
  if (tokenPart.length !== 2 || tokenPart[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Invalid Authorization header format' });
  }

  const token = tokenPart[1];

  // TODO: здесь будет твоя логика валидации токена и получения пользователя из БД
  // Пока делаем заглушку, чтобы фронтенд сразу заработал
  console.log('Received token:', token);

  // Пример «фейкового» пользователя (удали, когда подключишь БД)
  const mockUser = {
    name: 'Test User',
    surname: 'Testerov',
    email: 'test@example.com',
    id: 'mock-id-123',
    token: token,
    role: 'student',
    birth: new Date('1990-01-01').toISOString(),
    edu_group: 'GRP-2024',
    avatarURI: null,
    score: 100,
    email_verified: 1,
    notifs_checked: 1
  };

  res.status(200).json(mockUser);
}
