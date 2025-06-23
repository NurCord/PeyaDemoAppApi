const Food = require('../models/Food');

// Obtener todos los productos
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener un solo producto
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Crear un nuevo producto
const createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    const saved = await food.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error });
  }
};

// Actualizar un producto
const updateFood = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar un producto
const deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar producto', error });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
