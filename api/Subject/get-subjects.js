const Subject = require("../../models/Subject");

async function getSubjects(req, res) {
  try {
    const subject = await Subject.find({ grade: req.params.grade });
    if (!subject) {
      res.status(404).json({ message: "Subjects Not Found" });
    } else {
      res.status(200).json(subject);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getSubjects;
