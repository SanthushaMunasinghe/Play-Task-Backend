const Student = require("../../models/Student");

async function getStudents(req, res) {
  try {
    const students = await Student.find({
      institution: req.params.institutionid,
    });
    if (!students) {
      res.status(404).json({ message: "Student Not Found" });
    } else {
      res.status(200).json(students);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getStudents;
