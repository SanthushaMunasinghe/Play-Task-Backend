const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Topic",
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

module.exports = mongoose.model("Subtopic", SubtopicSchema);
