const Order = require('../models/Order');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    if (!Array.isArray(req.body.orderItems) || req.body.orderItems.length === 0) {
      return res.status(400).json({ message: 'orderItems debe ser un array con al menos un item.' });
    }
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear pedido', error });
  }
};

// Obtener historial de pedidos
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
};

module.exports = {
  createOrder,
  getOrders
};
