import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/users.js";
import RevokedToken from "../models/revokedTokens.js";
import { authenticateToken, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.decode(token);
    if (decoded?.exp) {
      await RevokedToken.create({
        token,
        expiresAt: new Date(decoded.exp * 1000)
      });
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});

router.get('/admin', authenticateToken, adminOnly, (req, res) => {
  res.json({ success: true, message: 'Welcome to admin panel' });
});

export default router;
