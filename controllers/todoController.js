const Todo = require('../models/Todo');

// Ensure methods are defined as async functions
exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = new Todo({
      title,
      description,
      completed
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Create Todo Error:', error);
    res.status(500).json({ 
      message: 'Error creating todo', 
      error: error.message 
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Get Todos Error:', error);
    res.status(500).json({ 
      message: 'Error fetching todos', 
      error: error.message 
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error('Get Todo Error:', error);
    res.status(500).json({ 
      message: 'Error fetching todo', 
      error: error.message 
    });
  }
};

exports.updateTodo = async (req, res) => {
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
    console.error('Update Todo Error:', error);
    res.status(400).json({ 
      message: 'Error updating todo', 
      error: error.message 
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ 
      message: 'Todo deleted successfully',
      deletedTodo 
    });
  } catch (error) {
    console.error('Delete Todo Error:', error);
    res.status(500).json({ 
      message: 'Error deleting todo', 
      error: error.message 
    });
  }
};