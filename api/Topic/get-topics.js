const Topic = require("../../models/Topic");

async function getTopics(req, res) {
  try {
    const topic = await Topic.find({
      $and: [{ subject: req.params.subject }, { term: req.params.term }],
    });
    if (!topic) {
      res.status(404).json({ message: "Topics Not Found" });
    } else {
      res.status(200).json(topic);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getTopics;
