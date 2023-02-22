const Subject = require("../../models/Subject");

async function createSubject(req, res) {
  try {
    const existingSubject = await Subject.findOne({ name: req.body.name });
    if (existingSubject) {
      res.status(400).json({ message: "Subject already exists" });
    } else {
      const subject = new Subject({
        name: req.body.name,
        grade: req.body.grade,
      });
      const newSubject = await subject.save();
      res.status(201).json({ subjectId: newSubject._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createSubject;
