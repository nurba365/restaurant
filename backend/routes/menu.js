import mongoose from 'mongoose';

router.post('/', async (req, res) => {
  try {
    const { restaurantId, name, description, price, category } = req.body;

    const newItem = new MenuItem({
      restaurant: new mongoose.Types.ObjectId(restaurantId),
      name,
      description,
      price,
      category
    });

    await newItem.save();
    const populatedItem = await newItem.populate('restaurant', 'name');

    res.status(201).json({ success: true, item: populatedItem });
  } catch (err) {
    console.error('Ошибка при добавлении блюда:', err);
    res.status(500).json({ success: false, message: 'Қате мәзір қосқанда' });
  }
});
