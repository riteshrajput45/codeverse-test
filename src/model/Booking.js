const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qty: Number,
  amount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
