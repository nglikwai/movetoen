const Todo = require("./todo.model");

const getAllTodos = async (planId) => {
  const todos = await Todo.find({ plan: planId }).sort({ createdAt: -1 });
  return todos
};

module.exports = {
  getAllTodos,
};
