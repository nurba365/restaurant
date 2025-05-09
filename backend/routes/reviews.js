import express from 'express';
import {
  getReviewsByRestaurant,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';

import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/restaurant/:restaurantId', getReviewsByRestaurant);
router.post('/', authenticateToken, createReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);

export default router;
