const Topic = require("../../models/Topic");

async function getTopic(req, res) {
  try {
    const topic = await Topic.findOne({ _id: req.params.topicid });
    if (!topic) {
      res.status(404).json({ message: "Topic Not Found" });
    } else {
      res.status(200).json(topic);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getTopic;
