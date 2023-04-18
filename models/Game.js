const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  subtopic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subtopic",
  },
  state: {
    type: Boolean,
    required: true,
  },
  gamedata: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Game", adminSchema);
