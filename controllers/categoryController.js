// controllers/categoryController.js
const Category = require('../models/Category');

const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const category = new Category({ name, description });
    
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
    }
    res.status(400).json({ message: 'Error al crear categoría', error });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};