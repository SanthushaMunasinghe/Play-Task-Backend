const Subtopic = require("../../models/Subtopic");

async function getSubtopic(req, res) {
  try {
    const subtopic = await Subtopic.findOne({ _id: req.params.subtopicid });
    if (!subtopic) {
      res.status(404).json({ message: "Subtopic Not Found" });
    } else {
      res.status(200).json(subtopic);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getSubtopic;
