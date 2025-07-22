// controllers/categoryController.js
const Category = require('../models/Category');
const { 
  createListResponse, 
  createObjectResponse, 
  createErrorResponse 
} = require('../utils/apiResponse');

const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(createListResponse(categories, 'Categories retrieved successfully'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error retrieving categories'));
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const category = new Category({ name, description });
    
    const saved = await category.save();
    res.status(201).json(createObjectResponse(saved, 'Category created successfully'));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json(createErrorResponse('A category with that name already exists'));
    }
    res.status(400).json(createErrorResponse('Error creating category'));
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};