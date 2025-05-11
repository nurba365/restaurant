import Restaurant from '../models/restaurant.js';

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении ресторанов' });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (error) {
    res.status(404).json({ message: 'Ресторан не найден' });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const saved = await restaurant.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании ресторана' });
  }
};
