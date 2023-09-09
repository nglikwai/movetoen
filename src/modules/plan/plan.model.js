const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    deadline: Date,
    password: String,
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
