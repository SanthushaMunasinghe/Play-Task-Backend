const Grade = require("../../models/Grade");

async function getGrade(req, res) {
  try {
    const grade = await Grade.find({ institution: req.params.institution });
    if (!grade) {
      res.status(404).json({ message: "Grade Not Found" });
    } else {
      res.status(200).json(grade);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getGrade;
