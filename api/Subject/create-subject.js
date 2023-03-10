const Subject = require("../../models/Subject");
const Grade = require("../../models/Grade");

async function createSubject(req, res) {
  try {
    const existingGrade = await Grade.findOne({
      $and: [{ number: req.body.grade }, { institution: req.body.institution }],
    });
    if (existingGrade) {
      const existingSubject = await Subject.findOne({
        $and: [{ name: req.body.name }, { grade: existingGrade._id }],
      });
      if (existingSubject) {
        res.status(400).json({ message: "Subject Already Exists" });
      } else {
        const subject = new Subject({
          name: req.body.name,
          grade: existingGrade._id,
        });
        const newSubject = await subject.save();
        res.status(201).json({ subjectId: newSubject._id });
      }
    } else {
      res.status(404).json({ message: "Grade Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createSubject;
