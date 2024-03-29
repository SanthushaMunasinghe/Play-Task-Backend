const Teacher = require("../../models/Teacher");

const bcrypt = require("bcrypt");

async function createTeacher(req, res) {
  try {
    const existingTeacher = await Teacher.findOne({
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
    if (existingTeacher) {
      res.status(400).json({
        message:
          "Teacher Name, Email Or Contact Number Already Exists In This Institution",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        contactno: req.body.contactno,
        home: req.body.home,
        institution: req.body.institution,
        subjects: req.body.subjects,
        classrooms: req.body.classrooms,
        dp: req.body.dp,
        password: hashedPassword,
      });
      const newTeacher = await teacher.save();
      res.status(201).json({ teacherId: newTeacher._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createTeacher;
