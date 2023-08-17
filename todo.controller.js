const Todo = require("./Todo.model");
const express = require("express");
const router = express.Router();

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({createdAt:-1});
  res.json(todos);
});

router.post("", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });
});

module.exports = router;
