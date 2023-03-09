const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Grade",
  },
});

module.exports = mongoose.model("Classroom", classroomSchema);
