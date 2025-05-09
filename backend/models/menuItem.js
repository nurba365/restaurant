import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: 'Основное',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MenuItem', menuItemSchema);
