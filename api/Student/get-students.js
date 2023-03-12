const Student = require("../../models/Student");

async function getStudents(req, res) {
  try {
    const student = await Student.find({ institution: req.params.institution });
    if (!student) {
      res.status(404).json({ message: "Student Not Found" });
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getStudents;
