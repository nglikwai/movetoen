const Todo = require("./todo.model");
const Logger = require("../logger/logger.model");
const express = require("express");
const router = express.Router();
const { TodoStatus, TodoUrgent } = require("../../constants");

console.log(TodoStatus);

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
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
  const todo = await Todo.findById(id);
  await Todo.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });

  let logDescription;
  if (req.body.title) {
    if (todo.title === "New Todo") {
      logDescription = `${todo.person} create ${req.body.title}`;
    } else {
      return;
    }
  } else if (req.body.description) {
    if (req.body.description === todo.description) return;
    logDescription = ` ${todo.title} ${req.body.description}`;
  } else if (req.body.status) {
    logDescription = ` ${todo.title} from ${
      TodoStatus[todo.status]
    } to ${TodoStatus[req.body.status]}`;
  } else if (req.body.person) {
    logDescription = `assign ${todo.title} to ${req.body.person}`;
  } else if (req.body.deadline) {
    logDescription = ` ${todo.title} to ${req.body.deadline}`;
  } else if (req.body.urgent) {
    logDescription = ` ${todo.title} from ${TodoUrgent[todo.urgent]} to ${
      TodoUrgent[req.body.urgent]
    }`;
  } else {
    return
  }
  const logger = new Logger({
    description: logDescription,
    person: todo.person,
  });

  await logger.save();
});

module.exports = router;
