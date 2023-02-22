const Classroom = require("../../models/Classroom");

async function createClassroom(req, res) {
  try {
    const existingClass = await Classroom.findOne({ name: req.body.name });
    if (existingClass) {
      res.status(400).json({ message: "Classroom already exists" });
    } else {
      const classroom = new Classroom({
        name: req.body.name,
        grade: req.body.grade,
      });
      const newClass = await classroom.save();
      res.status(201).json({ classId: newClass._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createClassroom;
