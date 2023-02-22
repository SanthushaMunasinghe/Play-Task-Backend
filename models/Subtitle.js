const mongoose = require("mongoose");

const SubtitleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Title",
  },
  description: {
    type: String,
  },
  instructions: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Subtitle", SubtitleSchema);
