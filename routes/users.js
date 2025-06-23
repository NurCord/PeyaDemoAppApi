const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserInfo
} = require('../controllers/userController');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - encryptedPassword
 *             properties:
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *               encryptedPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       409:
 *         description: El usuario ya existe
 *       500:
 *         description: Error en el servidor
 *
 * /users/login:
 *   post:
 *     summary: Iniciar sesión con email y contraseña cifrada
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - encryptedPassword
 *             properties:
 *               email:
 *                 type: string
 *               encryptedPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 *
 * /users/{email}:
 *   get:
 *     summary: Obtener usuario por email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:email', getUserByEmail);
router.put('/update/:email', updateUserInfo)

module.exports = router;
