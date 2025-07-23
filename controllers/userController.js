const User = require('../models/User');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../utils/encryption');
const { 
  createObjectResponse, 
  createErrorResponse 
} = require('../utils/apiResponse');

// Helper function to prepare user response
const prepareUserResponse = (user) => ({
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    password: decrypt(user.encryptedPassword),
    userImageUrl: user.userImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});


// User registration
const registerUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Request body type:', typeof req.body);
    
    // Check if req.body is properly parsed
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json(createErrorResponse('Invalid request body format'));
    }
    
    const { fullName, email, password } = req.body;

    console.log({ fullName, email, password });

    // Validate required fields
    if (!email || !fullName || !password) {
      console.log('Missing fields - email:', !!email, 'fullName:', !!fullName, 'password:', !!password);
      console.log('Field values - email:', email, 'fullName:', fullName, 'password:', password);
      return res.status(400).json(createErrorResponse('Email, fullName, and password are required'));
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json(createErrorResponse('User already exists'));
    }

    const encryptedPassword = encrypt(password);

    const newUser = new User({ email, fullName, encryptedPassword });
    const saved = await newUser.save();
    console.log(saved);
    // Send response with decrypted password
    const userResponse = prepareUserResponse(saved);
    res.status(201).json(createObjectResponse(userResponse, 'User registered successfully'));
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message === 'Text to encrypt must be a non-empty string') {
      return res.status(400).json(createErrorResponse('Password is required and must be a string'));
    }
    res.status(500).json(createErrorResponse('Error registering user: ' + error.message));
  }
};

// Login (validation with encrypted password)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(createErrorResponse('User not found'));
    }

    // Decrypt and compare
    let decryptedPassword = decrypt(user.encryptedPassword);

    if (!decryptedPassword || password !== decryptedPassword) {
      return res.status(401).json(createErrorResponse('Incorrect password'));
    }
    
    // Send response with decrypted password
    const userResponse = prepareUserResponse(user);
    res.json(createObjectResponse(userResponse, 'Login successful'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error during login'));
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json(createErrorResponse('User not found'));
    }
    
    // Send response with decrypted password
    const userResponse = prepareUserResponse(user);
    res.json(createObjectResponse(userResponse, 'User retrieved successfully'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error retrieving user'));
  }
};

// Update user by email
const updateUserInfo = async (req, res) => {
  try {
    const { fullName, userImageUrl } = req.body;

    // Build only the fields we want to update
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
      return res.status(404).json(createErrorResponse('User not found'));
    }

    // Send response with decrypted password
    const userResponse = prepareUserResponse(user);
    res.json(createObjectResponse(userResponse, 'User updated successfully'));
  } catch (error) {
    res.status(500).json(createErrorResponse('Error updating user'));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserInfo,
};
