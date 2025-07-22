const Order = require('../models/Order');
const { 
  createListResponse, 
  createObjectResponse, 
  createErrorResponse 
} = require('../utils/apiResponse');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderItems, totalAmount, totalItems } = req.body;

    if (!userId) {
      return res.status(400).json(createErrorResponse('userId is required'));
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json(createErrorResponse('orderItems must be an array with at least one item.'));
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json(createErrorResponse('totalAmount must be greater than 0'));
    }

    if (!totalItems || totalItems <= 0) {
      return res.status(400).json(createErrorResponse('totalItems must be greater than 0'));
    }

    const orderData = {
      userId,
      orderDate: Date.now(),
      totalAmount,
      totalItems,
      orderItems
    };

    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    res.status(201).json(createObjectResponse(savedOrder, 'Order created successfully'));
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json(createErrorResponse('Error creating order'));
  }
};

// Get user order history
const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json(createErrorResponse('userId is required as query parameter'));
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.json(createListResponse(orders, 'Orders retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json(createErrorResponse('Error retrieving orders'));
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json(createErrorResponse('userId is required as query parameter'));
    }

    const order = await Order.findOne({ _id: orderId, userId })
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json(createErrorResponse('Order not found'));
    }

    res.json(createObjectResponse(order, 'Order retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json(createErrorResponse('Error retrieving order'));
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};
