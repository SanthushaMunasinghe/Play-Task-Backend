const Grade = require("../../models/Grade");

async function getGrade(req, res) {
  try {
    const grade = await Grade.findOne({
      $and: [
        { number: req.params.number },
        { institution: req.params.institution },
      ],
    });
    if (!grade) {
      res.status(404).json({ message: "Grade Not Found" });
    } else {
      res.status(200).json({ _id: grade._id, number: grade.number });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getGrade;
