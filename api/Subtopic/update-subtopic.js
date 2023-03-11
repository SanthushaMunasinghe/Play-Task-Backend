const Subtopic = require("../../models/Subtopic");

async function updateSubtopic(req, res) {
  try {
    const subtopic = await Subtopic.findById(req.params.id);
    if (!subtopic) {
      res.status(404).json({ message: "Subtopic Not Found" });
    }
    subtopic.title = req.body.title;
    subtopic.description = req.body.description;
    subtopic.instructions = req.body.instructions;
    await subtopic.save();
    res.status(200).json({ message: "Subtopic updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateSubtopic;
