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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderDate: {
    type: Number,
    default: Date.now()
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

// Export only the Order model since OrderItem is a subdocument
module.exports = mongoose.model('Order', OrderSchema);