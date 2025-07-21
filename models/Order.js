const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    default: ""
  },
  productImageUrl: {
    type: String,
    default: ""
  },
  productPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  orderDate: {
    type: Number,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  orderItems: [OrderItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
