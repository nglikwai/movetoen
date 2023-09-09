const mongoose = require("mongoose");

const luggageSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    size: Number,
    weight: Number,
    user: String,
    luggage_list: [{ title: String, size: Number, weight: Number }],
  },
  { timestamps: true }
);

const Luggage = mongoose.model("Luggage", luggageSchema);

module.exports = Luggage;
