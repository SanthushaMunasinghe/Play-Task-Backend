const Topic = require("../../models/Topic");
const Subject = require("../../models/Subject");
const Term = require("../../models/Term");

async function createTopic(req, res) {
  try {
    const existingSubject = await Subject.findOne({ _id: req.body.subject });

    if (existingSubject) {
      const existingTerm = await Term.findOne({
        $and: [{ grade: existingSubject.grade }, { number: req.body.term }],
      });

      if (existingTerm) {
        const existingTopic = await Topic.findOne({
          $and: [{ title: req.body.title }, { subject: req.body.subject }],
        });
        if (existingTopic) {
          res.status(400).json({ message: "Topic Already Exists" });
        } else {
          const topic = new Topic({
            title: req.body.title,
            subject: existingSubject._id,
            term: existingTerm._id,
          });
          const newTopic = await topic.save();
          res.status(201).json({ topicId: newTopic._id });
        }
      } else {
        res.status(401).json({ message: "Term Not Found" });
      }
    } else {
      res.status(401).json({ message: "Subject Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createTopic;
