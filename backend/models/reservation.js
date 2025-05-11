import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String }
});

export default mongoose.model('Reservation', reservationSchema);
