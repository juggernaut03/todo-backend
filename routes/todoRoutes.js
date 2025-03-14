const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Create Todo
router.post('/', async (req, res) => {
  try {
    await todoController.createTodo(req, res);
  } catch (error) {
    console.error('Route Create Todo Error:', error);
    res.status(500).json({ 
      message: 'Error in todo route', 
      error: error.message 
    });
  }
});

// Get All Todos
router.get('/', async (req, res) => {
  try {
    await todoController.getAllTodos(req, res);
  } catch (error) {
    console.error('Route Get Todos Error:', error);
    res.status(500).json({ 
      message: 'Error in todos route', 
      error: error.message 
    });
  }
});

// Get Todo by ID
router.get('/:id', async (req, res) => {
  try {
    await todoController.getTodoById(req, res);
  } catch (error) {
    console.error('Route Get Todo Error:', error);
    res.status(500).json({ 
      message: 'Error in todo route', 
      error: error.message 
    });
  }
});

// Update Todo
router.put('/:id', async (req, res) => {
  try {
    await todoController.updateTodo(req, res);
  } catch (error) {
    console.error('Route Update Todo Error:', error);
    res.status(500).json({ 
      message: 'Error in update todo route', 
      error: error.message 
    });
  }
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  try {
    await todoController.deleteTodo(req, res);
  } catch (error) {
    console.error('Route Delete Todo Error:', error);
    res.status(500).json({ 
      message: 'Error in delete todo route', 
      error: error.message 
    });
  }
});

module.exports = router;