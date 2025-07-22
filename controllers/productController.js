const Product = require('../models/Product');
const { 
  createListResponse, 
  createObjectResponse, 
  createErrorResponse,
  createMessageResponse 
} = require('../utils/apiResponse');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort({ name: 1 });
    res.json(createListResponse(products, 'Products retrieved successfully'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error retrieving products'));
  }
};

// Get a single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json(createErrorResponse('Product not found'));
    }
    res.json(createObjectResponse(product, 'Product retrieved successfully'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error retrieving product'));
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(createObjectResponse(saved, 'Product created successfully'));
  } catch (error) {
    res.status(400).json(createErrorResponse('Error creating product'));
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json(createErrorResponse('Product not found'));
    }
    res.json(createObjectResponse(updated, 'Product updated successfully'));
  } catch (error) {
    res.status(400).json(createErrorResponse('Error updating product'));
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json(createErrorResponse('Product not found'));
    }
    res.json(createMessageResponse('Product deleted successfully'));
  } catch (error) {
    res.status(400).json(createErrorResponse('Error deleting product'));
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
