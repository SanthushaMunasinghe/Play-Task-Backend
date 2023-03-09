const Classroom = require("../../models/Classroom");

const Grade = require("../../models/Grade");

async function createClassroom(req, res) {
  try {
    const existingGrade = await Grade.findOne({
      $and: [{ number: req.body.grade }, { institution: req.body.institution }],
    });
    if (existingGrade) {
      const existingClass = await Classroom.findOne({
        $and: [{ name: req.body.name }, { grade: existingGrade._id }],
      });
      if (existingClass) {
        res.status(400).json({ message: "Classroom Already Exists" });
      } else {
        const classroom = new Classroom({
          name: req.body.name,
          grade: existingGrade._id,
        });
        const newClass = await classroom.save();
        res.status(201).json({ classroomId: newClass._id });
      }
    } else {
      res.status(404).json({ message: "Grade Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createClassroom;
