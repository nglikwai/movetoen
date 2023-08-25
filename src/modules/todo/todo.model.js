const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  status: {
    type: Number,
    default: 0
  },
  urgent: {
    type: Number,
    default: 0
  },
  deadline: {
    type: String,
    default: '12/9'
  },
  person: {
    type: String,
    default: 'WILL'
  },
  description: String,
  
  
}, {timestamps: true});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
