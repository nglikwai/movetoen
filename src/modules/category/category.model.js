const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    orderDate: Date,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
