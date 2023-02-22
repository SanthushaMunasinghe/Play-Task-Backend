const Grade = require("../../models/Grade");

async function createGrade(req, res) {
  try {
    const existingGrade = await Grade.findOne({ number: req.body.number });
    if (existingGrade) {
      res.status(400).json({ message: "Grade already exists" });
    } else {
      const grade = new Grade({
        number: req.body.number,
        institution: req.body.institution,
      });
      const newGrade = await grade.save();
      res.status(201).json({ gradeId: newGrade._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createGrade;
