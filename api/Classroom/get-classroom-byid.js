const Classroom = require("../../models/Classroom");

async function getClassroomById(req, res) {
  try {
    const classroom = await Classroom.findOne({ _id: req.params.id });
    if (!classroom) {
      res.status(404).json({ message: "Classroom Not Found" });
    } else {
      res.status(200).json(classroom);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getClassroomById;
