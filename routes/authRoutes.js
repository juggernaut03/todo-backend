// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Validation middleware
const validateRegistration = (req, res, next) => {
  const { username, email, phoneNumber, password } = req.body;

  // Basic validation
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Username validation
  if (username.length < 3 || username.length > 30) {
    return res.status(400).json({ message: 'Username must be between 3 and 30 characters' });
  }

  // Email validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Phone number validation (basic international format)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  // Password validation
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  next();
};

// Registration Route
router.post('/register', validateRegistration, async (req, res) => {
  try {
    await authController.registerUser(req, res);
  } catch (error) {
    console.error('Registration Route Error:', error);
    res.status(500).json({ 
      message: 'Error in registration route', 
      error: error.message 
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    await authController.loginUser(req, res);
  } catch (error) {
    console.error('Login Route Error:', error);
    res.status(500).json({ 
      message: 'Error in login route', 
      error: error.message 
    });
  }
});

module.exports = router;