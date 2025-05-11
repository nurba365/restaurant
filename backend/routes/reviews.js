import express from 'express';
import Review from '../models/review.js';

const router = express.Router();

// GET - отзывы для ресторана
router.get('/:restaurantId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка получения отзывов' });
  }
});

// POST - отзыв добавить
router.post('/:restaurantId/reviews', async (req, res) => {
  try {
    const { text } = req.body;
    const { restaurantId } = req.params;

    const newReview = new Review({ restaurantId, text });
    await newReview.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка добавления отзыва' });
  }
});

export default router;
