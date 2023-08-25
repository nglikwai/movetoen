const mongoose = require("mongoose");

const loggerSchema = new mongoose.Schema(
  {
    description: String,
    person: String,
  },
  { timestamps: true }
);

const Logger = mongoose.model("Logger", loggerSchema);

module.exports = Logger;
