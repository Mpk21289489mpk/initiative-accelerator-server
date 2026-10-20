import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- CORS: РАЗРЕШАЕМ ЗАПРОСЫ С ТВОЕГО ФРОНТА ---
  const allowedOrigin = 'https://initiative-accelerator-front-phi.vercel.app';
  
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка предварительного запроса (OPTIONS) — обязательно для CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // --------------------------------------------------

  // Разрешаем только GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Извлекаем токен из заголовка Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  
  // Если токена нет — отдаём гостя, чтобы фронтенд сразу заработал и не показывал белый экран
  if (!authHeader) {
    const mockGuest = {
      name: 'Гость',
      surname: '',
      email: '',
      id: '',
      token: '',
      role: 'default',
      birth: new Date('2000-01-01').toISOString(),
      edu_group: null,
      avatarURI: null,
      score: 0,
      email_verified: 0,
      notifs_checked: 1
    };
    return res.status(200).json(mockGuest);
  }

  const tokenPart = authHeader.split(' ');
  if (tokenPart.length !== 2 || tokenPart[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Invalid Authorization header format' });
  }

  const token = tokenPart[1];
  console.log('Received token:', token);

  // Пример «фейкового» пользователя (замени на реальную логику с БД позже)
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
