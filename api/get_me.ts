import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // --- ГЛАВНОЕ: разрешаем запросы именно с твоего фронта ---
  const allowedOrigin = 'https://initiative-accelerator-front-phi.vercel.app';
  
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка OPTIONS-запроса (обязательно для CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // ---------------------------------------------------------

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Если токена нет — отдаём гостя (чтобы фронтенд не ломался)
  const authHeader = req.headers.authorization;
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

  // Дальше идёт логика токена (если нужна)
  const tokenPart = authHeader.split(' ');
  if (tokenPart.length !== 2 || tokenPart[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Invalid Authorization header' });
  }

  const token = tokenPart[1];
  console.log('Token received:', token);

  // Возвращаем тестового пользователя
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
