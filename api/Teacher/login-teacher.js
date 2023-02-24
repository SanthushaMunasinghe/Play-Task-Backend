const Teacher = require("../../models/Teacher");
const Institution = require("../../models/Institution");

const bcrypt = require("bcrypt");

async function teacherLogin(req, res) {
  try {
    const instName = await Institution.findOne({ name: req.body.institution });
    if (!instName) {
      res.status(404).json({ message: "Institution not found" });
    } else {
      const teacher = await Teacher.findOne({
        $and: [{ name: req.body.name }, { institution: instName._id }],
      });
      if (!teacher) {
        res.status(404).json({ message: "User not found" });
      } else {
        const isPasswordCorrect = await bcrypt.compareSync(
          req.body.password,
          teacher.password
        );
        if (!isPasswordCorrect) {
          res.status(401).json({ message: "Incorrect password" });
        } else {
          res.status(200).json({
            userid: teacher._id,
            name: teacher.name,
            institution: teacher.institution,
            subjects: teacher.subjects,
            classrooms: teacher.classrooms,
            dp: teacher.dp,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = teacherLogin;
