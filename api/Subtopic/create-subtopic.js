const Subtopic = require("../../models/Subtopic");
const Topic = require("../../models/Topic");

async function createSubtopic(req, res) {
  try {
    const existingTopic = await Topic.findOne({ _id: req.body.topic });
    if (existingTopic) {
      const existingSubtopic = await Subtopic.findOne({
        $and: [{ title: req.body.title }, { topic: req.body.topic }],
      });
      if (existingSubtopic) {
        res.status(400).json({ message: "Subtopic Already Exists" });
      } else {
        const subtopic = new Subtopic({
          title: req.body.title,
          topic: existingTopic._id,
          description: req.body.description,
          instructions: req.body.instructions,
        });
        const newSubtopic = await subtopic.save();
        res.status(201).json({ subtopicId: newSubtopic._id });
      }
    } else {
      res.status(404).json({ message: "Topic Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createSubtopic;
