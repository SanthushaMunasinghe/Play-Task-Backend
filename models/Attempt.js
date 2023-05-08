const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  levelscore: {
    type: String,
    required: true,
  },
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
});

module.exports = mongoose.model("Attempt", attemptSchema);
