const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - orderItems
 *               - totalAmount
 *               - totalItems
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que hace el pedido
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     productDescription:
 *                       type: string
 *                     productImageUrl:
 *                       type: string
 *                     productPrice:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *               totalAmount:
 *                 type: number
 *                 description: Monto total del pedido
 *               totalItems:
 *                 type: integer
 *                 description: Número total de items
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 *
 *   get:
 *     summary: Obtener el historial de pedidos de un usuario
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para filtrar pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos del usuario
 *       400:
 *         description: userId no proporcionado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Obtener un pedido específico por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para verificar propiedad del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       400:
 *         description: userId no proporcionado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error en el servidor
 */

// Endpoints
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);

module.exports = router;
