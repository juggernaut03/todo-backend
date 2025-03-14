// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      username: user.username 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '7d' 
    }
  );
};

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email }, 
        { username }, 
        { phoneNumber }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email, username, or phone number' 
      });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password
    });

    // Save user
    const savedUser = await newUser.save();

    // Generate token
    const token = generateToken(savedUser);

    // Respond with user info and token (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        phoneNumber: savedUser.phoneNumber
      },
      token
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    // Respond with user info and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      message: 'Error logging in', 
      error: error.message 
    });
  }
};