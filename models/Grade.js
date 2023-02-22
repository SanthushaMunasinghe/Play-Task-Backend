const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Institution",
  },
});

module.exports = mongoose.model("Grade", gradeSchema);
