// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Remove deprecated options
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('MongoDB URI is not defined in .env file');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;