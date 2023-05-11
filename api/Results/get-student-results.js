const Subject = require("../../models/Subject");
const Topic = require("../../models/Topic");
const Subtopic = require("../../models/Subtopic");
const Attempt = require("../../models/Attempt");

async function getStudentResults(req, res) {
  try {
    const subject = await Subject.findOne({ _id: req.params.id });
    if (!subject) {
      res.status(400).json({
        message: "Subject Not Found",
      });
    } else {
      const topics = await Topic.find({ subject: subject._id });
      if (topics.length != 0) {
        for (const topic of topics) {
          const subtopics = await Subtopic.find({ topic: topic._id });
          if (subtopics.length != 0) {
            for (const subtopic of subtopics) {
              const attempt = await Attempt.findOne({
                $and: [
                  { subtopic: subtopic._id },
                  { student: req.params.student },
                ],
              });
              if (attempt) {
              }
            }
          } else {
            res.status(400).json({ message: "Subtopics Does Not Exists" });
          }
        }
      } else {
        res.status(400).json({ message: "Topics Does Not Exists" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getStudentResults;
