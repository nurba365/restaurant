import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import RevokedToken from "../models/revokedTokens.js";
import { authenticateToken, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// 🔐 Тіркелу
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email уже зарегистрирован' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Регистрация прошла успешно' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

// 🔑 Кіру
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Неверные данные' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Ошибка входа' });
  }
});

// 🚪 Шығу (токенді бұғаттау)
router.post('/logout', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ success: false, message: 'Токен жоқ' });
  }

  try {
    const decoded = jwt.decode(token);
    if (decoded?.exp) {
      await RevokedToken.create({
        token,
        expiresAt: new Date(decoded.exp * 1000)
      });
    }

    res.json({ success: true, message: 'Сессия аяқталды' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Ошибка выхода' });
  }
});

// 👮‍♂️ Админ панель (қорғалған)
router.get('/admin', authenticateToken, adminOnly, (req, res) => {
  res.json({ success: true, message: 'Добро пожаловать в админ-панель' });
});

export default router;
