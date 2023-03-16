const Student = require("../../models/Student");
const Classroom = require("../../models/Classroom");
const Grade = require("../../models/Grade");

const bcrypt = require("bcrypt");

async function createStudent(req, res) {
  try {
    const existingStudent = await Student.findOne({
      $and: [
        {
          $or: [
            { name: req.body.name },
            { email: req.body.email },
            { contactno: req.body.contactno },
          ],
        },
        { institution: req.body.institution },
      ],
    });
    if (existingStudent) {
      res.status(400).json({
        message:
          "Student Name, Email Or Contact Number Already Exists In This Institution",
      });
    } else {
      const existingGrade = await Grade.findOne({
        $and: [
          { number: req.body.grade },
          { institution: req.body.institution },
        ],
      });
      if (existingGrade) {
        const existingClassroom = await Classroom.findOne({
          $and: [{ name: req.body.classroom }, { grade: existingGrade._id }],
        });
        if (existingClassroom) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          const student = new Student({
            name: req.body.name,
            email: req.body.email,
            contactno: req.body.contactno,
            home: req.body.home,
            institution: req.body.institution,
            subjects: req.body.subjects,
            classroom: existingClassroom._id,
            dp: req.body.dp,
            password: hashedPassword,
          });
          const newStudent = await student.save();
          res.status(201).json({ studentId: newStudent._id });
        } else {
          res.status(400).json({ message: "Classroom Does Not Exists" });
        }
      } else {
        res.status(400).json({ message: "Grade Does Not Exists" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createStudent;
