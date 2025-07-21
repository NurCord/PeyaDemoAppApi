const User = require('../models/User');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../utils/encryption');

// Función helper para preparar respuesta de usuario
const prepareUserResponse = (user) => {
  let decryptedPassword = '';
  try {
    // Intentar desencriptar la contraseña
    decryptedPassword = decrypt(user.encryptedPassword);
  } catch (error) {
    // Si falla la desencriptación, usar una contraseña por defecto
    console.warn('Error desencriptando contraseña:', error.message);
    decryptedPassword = 'password123';
  }

  return {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    password: decryptedPassword, // Contraseña desencriptada
    userImageUrl: user.userImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const encryptedPassword = encrypt(password);

    const newUser = new User({ email, fullName, encryptedPassword });
    const saved = await newUser.save();
    
    // Enviar respuesta con contraseña desencriptada
    const userResponse = prepareUserResponse(saved);
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Login (validación con contraseña encriptada)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Desencriptar y comparar
    let decryptedPassword;
    try {
      decryptedPassword = decrypt(user.encryptedPassword);
    } catch (error) {
      return res.status(401).json({ message: 'Error en la contraseña almacenada' });
    }

    if (password !== decryptedPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    
    // Enviar respuesta con contraseña desencriptada
    const userResponse = prepareUserResponse(user);
    res.json({ message: 'Login exitoso', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Obtener usuario por email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    
    // Enviar respuesta con contraseña desencriptada
    const userResponse = prepareUserResponse(user);
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// Actualizar usuario por email
const updateUserInfo = async (req, res) => {
  try {
    const { fullName, userImageUrl } = req.body;

    // Construimos solo los campos que sí queremos actualizar
    const updateFields = { fullName };

    if (userImageUrl !== undefined && userImageUrl !== null && userImageUrl.trim() !== '') {
      updateFields.userImageUrl = userImageUrl;
    }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Enviar respuesta con contraseña desencriptada
    const userResponse = prepareUserResponse(user);
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserInfo,
};
