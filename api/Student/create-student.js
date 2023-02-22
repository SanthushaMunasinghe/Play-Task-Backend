const Student = require("../../models/Student");

const bcrypt = require("bcrypt");

async function createStudent(req, res) {
  try {
    const existingStudent = await Student.findOne({
      $or: [
        { name: req.body.name },
        { email: req.body.email },
        { contactno: req.body.contactno },
      ],
    });
    if (existingStudent) {
      res.status(400).json({
        message: "Student name, email or contact number already exists",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const student = new Student({
        name: req.body.name,
        email: req.body.email,
        contactno: req.body.contactno,
        home: req.body.home,
        institution: req.body.institution,
        subjects: req.body.subjects,
        classroom: req.body.classroom,
        dp: req.body.dp,
        password: hashedPassword,
      });
      const newStudent = await student.save();
      res.status(201).json({ studentId: newStudent._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createStudent;
