const Term = require("../../models/Term");

async function createTerm(req, res) {
  try {
    const existingTerm = await Term.findOne({
      $and: [{ number: req.body.number }, { grade: req.body.grade }],
    });
    if (existingTerm) {
      res.status(400).json({ message: "Term Already Exists" });
    } else {
      const term = new Term({
        number: req.body.number,
        grade: req.body.grade,
      });
      const newTerm = await term.save();
      res.status(201).json({ termId: newTerm._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createTerm;
