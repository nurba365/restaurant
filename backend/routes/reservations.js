import express from 'express';
import Reservation from '../models/reservation.js';

const router = express.Router();

// ✅ Жаңа брондау жасау
router.post('/', async (req, res) => {
  try {
    const { restaurantId, name, phone, guests, date, time, message } = req.body;

    if (!restaurantId || !name || !phone || !guests || !date || !time) {
      return res.status(400).json({ success: false, message: 'Толық мәлімет енгізіңіз' });
    }

    const newReservation = new Reservation({
      restaurantId, name, phone, guests, date, time, message
    });

    await newReservation.save();

    res.status(201).json({ success: true, message: 'Бронь сәтті сақталды' });
  } catch (err) {
    console.error('Бронь жасау қатесі:', err);
    res.status(500).json({ success: false, message: 'Сервер қатесі' });
  }
});

// ✅ Белгілі бір ресторанға қатысты барлық бронь
router.get('/:restaurantId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ restaurantId: req.params.restaurantId });
    res.status(200).json(reservations);
  } catch (err) {
    console.error('Бронь оқу қатесі:', err);
    res.status(500).json({ success: false, message: 'Сервер қатесі' });
  }
});

export default router;
