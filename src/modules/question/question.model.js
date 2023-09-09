const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    source: String,
    category: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
