const Term = require("../../models/Term");

async function deleteTerms(req, res) {
  try {
    const term = await Term.deleteMany({ grade: req.params.grade });
    if (!term) {
      res.status(404).json({ message: "Term not found" });
    } else {
      res.status(200).json({ message: "Term deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = deleteTerms;
