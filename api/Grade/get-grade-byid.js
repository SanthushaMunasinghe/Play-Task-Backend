const Grade = require("../../models/Grade");

async function getGradeById(req, res) {
  try {
    const grade = await Grade.findOne({ _id: req.params.id });
    if (!grade) {
      res.status(404).json({ message: "Grade Not Found" });
    } else {
      res.status(200).json({ id: grade._id, number: grade.number });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getGradeById;
