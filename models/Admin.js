const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authorization: {
    type: String,
    required: true,
  },
  contactno: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
