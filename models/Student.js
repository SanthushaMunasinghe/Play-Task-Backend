const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactno: {
    type: String,
    required: true,
    unique: true,
  },
  home: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
  dp: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
