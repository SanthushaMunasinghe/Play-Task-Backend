const Attempt = require("../../models/Attempt");

async function getAttempts(req, res) {
  try {
    const attempt = await Attempt.find({
      $and: [{ student: req.params.student }, { number: 0 }],
    });
    if (!attempt) {
      res.status(200).json({ message: "Attempts Not Found" });
    } else {
      res.status(200).json(attempt);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getAttempts;
