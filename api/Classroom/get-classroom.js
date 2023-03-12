const Classroom = require("../../models/Classroom");

async function getClassroom(req, res) {
  try {
    const classroom = await Classroom.findOne({
      $and: [{ grade: req.params.grade }, { name: req.params.name }],
    });
    if (!classroom) {
      res.status(404).json({ message: "Classroom Not Found" });
    } else {
      res.status(200).json({ _id: classroom._id, name: classroom.name });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getClassroom;
