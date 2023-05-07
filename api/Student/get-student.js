const Student = require("../../models/Student");

async function getStudent(req, res) {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
    });
    if (!student) {
      res.status(404).json({ message: "Student Not Found" });
    } else {
      res.status(200).json({
        id: student._id,
        name: student.name,
        email: student.email,
        contactno: student.contactno,
        home: student.home,
        classroom: student.classroom,
        subjects: student.subjects,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getStudent;
