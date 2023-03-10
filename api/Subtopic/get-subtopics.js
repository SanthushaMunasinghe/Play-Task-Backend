const Subtopic = require("../../models/Subtopic");

async function getSubtopics(req, res) {
  try {
    const subtopics = await Subtopic.find({ topic: req.params.topic });
    if (!subtopics) {
      res.status(404).json({ message: "Subtopics Not Found" });
    } else {
      res.status(200).json(subtopics);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getSubtopics;
