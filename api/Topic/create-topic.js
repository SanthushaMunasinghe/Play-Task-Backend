const Topic = require("../../models/Topic");

async function createTopic(req, res) {
  try {
    const existingTopic = await Topic.findOne({
      $and: [{ title: req.body.title }, { subject: req.body.subject }],
    });
    if (existingTopic) {
      res.status(400).json({ message: "Topic already exists" });
    } else {
      const topic = new Topic({
        title: req.body.title,
        subject: req.body.subject,
        term: req.body.term,
      });
      const newTopic = await topic.save();
      res.status(201).json({ topicId: newTopic._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createTopic;
