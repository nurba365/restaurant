import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  restaurantId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);
