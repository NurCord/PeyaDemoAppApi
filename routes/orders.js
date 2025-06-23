const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

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
 *               - orderId
 *               - productIds
 *               - total
 *               - timestamp
 *             properties:
 *               orderId:
 *                 type: string
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     price:
 *                       type: number
 *                     hasDrink:
 *                       type: boolean
 *                     quantity:
 *                       type: integer
 *               total:
 *                 type: number
 *               timestamp:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 *
 *   get:
 *     summary: Obtener el historial de pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       500:
 *         description: Error en el servidor
 */

// Endpoints
router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;
