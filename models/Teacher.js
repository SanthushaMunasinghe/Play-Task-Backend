const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Institution",
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  classrooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
  ],
  dp: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
