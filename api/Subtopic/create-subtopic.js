const Subtopic = require("../../models/Subtopic");

async function createSubtopic(req, res) {
  try {
    const existingSubtopic = await Subtopic.findOne({
      $and: [{ title: req.body.title }, { topic: req.body.topic }],
    });
    if (existingSubtopic) {
      res.status(400).json({ message: "Subtopic already exists" });
    } else {
      const subtopic = new Subtopic({
        title: req.body.title,
        topic: req.body.topic,
        description: req.body.description,
        instructions: req.body.instructions,
      });
      const newSubtopic = await subtopic.save();
      res.status(201).json({ subtopicId: newSubtopic._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createSubtopic;
