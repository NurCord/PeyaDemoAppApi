// routes/foods.js
const express = require('express');
const router = express.Router();
const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} = require('../controllers/foodController');

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Obtener todos los productos (foods)
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Lista de productos
 *
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - imageUrl
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               hasDrink:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado
 */

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalle del producto
 *
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               hasDrink:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
