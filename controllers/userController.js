const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, fullName, encryptedPassword: hashedPassword });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Login (validación simple)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.encryptedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    // TO-DO: ver como manejar las respuestas con mensajes o data
    res.json({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Obtener usuario por email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
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

    res.json(user);
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
