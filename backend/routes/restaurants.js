import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
} from '../controllers/restaurantsController.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);

export default router;
