const Teacher = require("../../models/Teacher");

async function getTeachers(req, res) {
  try {
    const teacher = await Teacher.find({ institution: req.params.institution });
    if (!teacher) {
      res.status(404).json({ message: "Teacher Not Found" });
    } else {
      res.status(200).json(teacher);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getTeachers;
