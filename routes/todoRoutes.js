// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../models/Todo');

// Explicitly define route handlers
router.post('/', (req, res) => {
  todoController.createTodo(req, res);
});

router.get('/', (req, res) => {
  todoController.getAllTodos(req, res);
});

router.get('/:id', (req, res) => {
  todoController.getTodoById(req, res);
});

router.put('/:id', (req, res) => {
  todoController.updateTodo(req, res);
});

router.delete('/:id', (req, res) => {
  todoController.deleteTodo(req, res);
});

module.exports = router;