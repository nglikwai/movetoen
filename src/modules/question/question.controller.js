const Question = require("./question.model");
const express = require("express");
const router = express.Router();

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

router.post("/", async (req, res) => {
  const questions = await Question.find();
  const question = new Question({
    ...req.body,
    title: "New Question",
    description: "add more",
  });
  question.save();
  res.json([{ ...question["_doc"], isNew: true }, ...questions]);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Question.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });
});

router.delete("/:id", async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);
  res.json(question);
});

module.exports = router;
