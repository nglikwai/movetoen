const Luggage = require("./luggage.model");
const express = require("express");
const router = express.Router();

// Define route handlers for user-related routes
router.get("/", async (req, res) => {
  const luggages = await Luggage.find();
  res.json(luggages);
});

router.post("/", async (req, res) => {
  if (req.body._id) {
    const luggage = await Luggage.findByIdAndUpdate(req.body._id, req.body);
  } else {
    const newLuggage = new Luggage(req.body);
    await newLuggage.save();
  }
  const luggages = await Luggage.find();
  res.json(luggages);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Luggage.findByIdAndUpdate(id, req.body);
  res.json({ message: "Todo updated" });
});

router.delete("/:id", async (req, res) => {
  const luggage = await Luggage.findByIdAndDelete(req.params.id);
  res.json(luggage);
});

module.exports = router;
