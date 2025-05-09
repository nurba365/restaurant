import express from 'express';
import {
  getMenuByRestaurant,
  createMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { authenticateToken, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/restaurant/:restaurantId', getMenuByRestaurant);
router.post('/', authenticateToken, adminOnly, createMenuItem);
router.delete('/:id', authenticateToken, adminOnly, deleteMenuItem);

export default router;
