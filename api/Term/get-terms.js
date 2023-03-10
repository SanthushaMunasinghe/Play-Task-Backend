const Term = require("../../models/Term");

async function getTerm(req, res) {
  try {
    const term = await Term.find({ grade: req.params.grade });
    if (!term) {
      res.status(404).json({ message: "Term Not Found" });
    } else {
      res.status(200).json(term);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getTerm;
