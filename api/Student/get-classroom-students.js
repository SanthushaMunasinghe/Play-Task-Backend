const Student = require("../../models/Student");

async function getClassroomStudents(req, res) {
  try {
    const student = await Student.find({ classroom: req.params.classroom });
    if (!student) {
      res.status(404).json({ message: "Students Not Found" });
    } else {
      res.status(200).json(student);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getClassroomStudents;
