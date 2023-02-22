const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  subtopic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subtopic",
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Result", resultSchema);
