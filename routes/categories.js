// routes/categories.js
const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  // ... otros métodos
} = require('../controllers/categoryController');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías activas
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 * 
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria creada
 */

router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = router;