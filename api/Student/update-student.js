const Student = require("../../models/Student");

async function updateStudent(req, res) {
  try {
    const existingStudent = await Student.find({
      $and: [
        {
          $or: [
            { name: req.body.name },
            { email: req.body.email },
            { contactno: req.body.contactno },
          ],
        },
        { institution: req.params.institution },
      ],
    });
    if (existingStudent.length != 0) {
      res.status(400).json({ message: "Student Already Exists" });
    } else {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student Not Found" });
      }
      student.name = req.body.name ? req.body.name : student.name;
      student.email = req.body.email ? req.body.email : student.email;
      student.contactno = req.body.contactno
        ? req.body.contactno
        : student.contactno;
      student.home = req.body.home ? req.body.home : student.home;
      student.subjects = req.body.subjects;
      student.classrooms = req.body.classroom;
      await student.save();
      res.status(200).json({ message: "Student updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateStudent;
