const Student = require("../../models/Student");
const Institution = require("../../models/Institution");

const bcrypt = require("bcrypt");

async function studentLogin(req, res) {
  try {
    const instName = await Institution.findOne({ name: req.body.institution });
    if (!instName) {
      res.status(404).json({ message: "Institution not found" });
    } else {
      const student = await Student.findOne({
        $and: [{ name: req.body.name }, { institution: instName._id }],
      });
      if (!student) {
        res.status(404).json({ message: "User not found" });
      } else {
        const isPasswordCorrect = await bcrypt.compareSync(
          req.body.password,
          student.password
        );
        if (!isPasswordCorrect) {
          res.status(401).json({ message: "Incorrect password" });
        } else {
          res.status(200).json({
            userid: student._id,
            name: student.name,
            institution: student.institution,
            subjects: student.subjects,
            dp: student.dp,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = studentLogin;
