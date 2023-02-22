const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Grade",
  },
});

module.exports = mongoose.model("Term", termSchema);
