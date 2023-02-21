const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  status: {
    type: String,
  },
  completion_time: {
    type: String,
  },
  creation_time: {
    type: String,
    },
});
module.exports = mongoose.model("todo", todoSchema, "todos");
