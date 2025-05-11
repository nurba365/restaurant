import Review from '../models/review.js';

export const getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке отзывов' });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = new Review({
      restaurant: req.body.restaurantId,
      user: req.user.id, 
      text: req.body.text,
    });

    const saved = await review.save();
    res.status(201).json({ success: true, review: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ошибка при создании отзыва' });
  }
};

// Обновление отзыва
export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении' });
  }
};

// Удаление отзыва
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении' });
  }
};
