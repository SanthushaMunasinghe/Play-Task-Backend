const Subject = require("../../models/Subject");

async function getSubject(req, res) {
  try {
    const subject = await Subject.findOne({ _id: req.params.subjectid });
    if (!subject) {
      res.status(404).json({ message: "Subject Not Found" });
    } else {
      res.status(200).json(subject);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getSubject;
