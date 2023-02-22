const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Topic", TopicSchema);
