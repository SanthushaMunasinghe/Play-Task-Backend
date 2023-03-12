const Classroom = require("../../models/Classroom");

async function getClassrooms(req, res) {
  try {
    const classroom = await Classroom.find({ grade: req.params.grade });
    if (!classroom) {
      res.status(404).json({ message: "Classroom Not Found" });
    } else {
      res.status(200).json(classroom);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getClassrooms;
