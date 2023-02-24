const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  status: {
    type: String,
  },
  completionTime: {
    type: Date,
  },
  creationTime: {
    type: Date,
    },
});
module.exports = mongoose.model("todo", todoSchema, "todos");
