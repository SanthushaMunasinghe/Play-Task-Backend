const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subject",
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Term",
  },
});

module.exports = mongoose.model("Title", TitleSchema);
