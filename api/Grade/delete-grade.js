const Grade = require("../../models/Grade");

async function deleteGrade(req, res) {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) {
      res.status(404).json({ message: "Grade not found" });
    } else {
      res.status(200).json({ message: "Grade deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = deleteGrade;
