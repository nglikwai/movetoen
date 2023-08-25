const Logger = require("./logger.model");
const express = require("express");
const router = express.Router();

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const loggers = await Logger.find().sort({ createdAt: -1 });
  res.json(loggers);
});

router.post("", async (req, res) => {
  const logger = new Logger(req.body);
  await logger.save();
  res.json(logger);
});

router.delete("/:id", async (req, res) => {
  const logger = await Logger.findByIdAndDelete(req.params.id);
  res.json(logger);
});

module.exports = router;
