import mongoose from 'mongoose';

const revokedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Экспорт по умолчанию
const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);
export default RevokedToken;
