const Order = require('../models/Order');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { userId, orderItems, totalAmount, totalItems } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId es requerido' });
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'orderItems debe ser un array con al menos un item.' });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'totalAmount debe ser mayor a 0' });
    }

    if (!totalItems || totalItems <= 0) {
      return res.status(400).json({ message: 'totalItems debe ser mayor a 0' });
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
    
    res.status(201).json({
      message: 'Pedido creado exitosamente',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
};

// Obtener historial de pedidos de un usuario
const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId es requerido como parámetro de query' });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.json({
      message: 'Pedidos obtenidos exitosamente',
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId es requerido como parámetro de query' });
    }

    const order = await Order.findOne({ _id: orderId, userId })
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json({
      message: 'Pedido obtenido exitosamente',
      order
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};
