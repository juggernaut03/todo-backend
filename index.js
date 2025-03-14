const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug logging
console.log('Current directory:', __dirname);
console.log('Resolved db path:', path.resolve('./config/db'));
console.log('Resolved routes path:', path.resolve('./routes/todoRoutes'));

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/todos', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});