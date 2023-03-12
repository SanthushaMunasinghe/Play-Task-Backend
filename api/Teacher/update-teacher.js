const Teacher = require("../../models/Teacher");

async function updateTeacher(req, res) {
  try {
    const existingTeacher = await Teacher.find({
      $and: [
        {
          $or: [
            { name: req.body.name },
            { email: req.body.email },
            { contactno: req.body.contactno },
          ],
        },
        { institution: req.params.institution },
      ],
    });
    if (existingTeacher.length != 0) {
      res.status(400).json({ message: "Teacher Already Exists" });
    } else {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) {
        res.status(404).json({ message: "Teacher Not Found" });
      }
      teacher.name = req.body.name ? req.body.name : teacher.name;
      teacher.email = req.body.email ? req.body.email : teacher.email;
      teacher.contactno = req.body.contactno
        ? req.body.contactno
        : teacher.contactno;
      teacher.home = req.body.home ? req.body.home : teacher.home;
      teacher.subjects = req.body.subjects;
      teacher.classrooms = req.body.classrooms;
      await teacher.save();
      res.status(200).json({ message: "Teacher updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateTeacher;
