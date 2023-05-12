const Subject = require("../../models/Subject");
const Topic = require("../../models/Topic");
const Subtopic = require("../../models/Subtopic");
const Attempt = require("../../models/Attempt");

async function getStudentResults(req, res) {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(400).json({
        message: "Subject Not Found",
      });
    }

    const topics = await Topic.find({ subject: subject._id }).populate(
      "subtopics"
    );
    if (topics.length === 0) {
      return res.status(400).json({ message: "Topics Does Not Exist" });
    }

    const subjectResult = {
      id: subject._id,
      name: subject.name,
      topics: [],
    };

    for (const topic of topics) {
      const topicResult = {
        id: topic._id,
        name: topic.title,
        subtopics: [],
      };

      for (const subtopic of topic.subtopics) {
        const attempt = await Attempt.findOne({
          subtopic: subtopic._id,
          student: req.params.student,
        });

        const subtopicResult = {
          id: subtopic._id,
          name: subtopic.title,
          attempt: attempt || null,
        };

        topicResult.subtopics.push(subtopicResult);
      }

      subjectResult.topics.push(topicResult);
    }

    await res.status(200).json({ subjectResult });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getStudentResults;
