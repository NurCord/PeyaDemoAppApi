const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  hasDrink: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);
