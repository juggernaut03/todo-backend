// controllers/todoController.js
const Todo = require('../models/Todo');

// Ensure all methods are explicitly defined
const todoController = {
  createTodo: async (req, res) => {
    try {
      const { title, description, dueDate } = req.body;
      const newTodo = new Todo({
        title,
        description,
        dueDate
      });

      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = todoController;