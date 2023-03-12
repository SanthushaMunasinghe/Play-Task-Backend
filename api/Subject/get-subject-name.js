const Subject = require("../../models/Subject");

async function getSubjectName(req, res) {
  try {
    const subject = await Subject.findOne({
      $and: [{ grade: req.params.grade }, { name: req.params.name }],
    });
    if (!subject) {
      res.status(404).json({ message: "Subject Not Found" });
    } else {
      res.status(200).json({ _id: subject._id, name: subject.name });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getSubjectName;
