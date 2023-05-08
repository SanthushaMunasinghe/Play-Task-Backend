const Attempt = require("../../models/Attempt");

async function createAttempt(req, res) {
  try {
    const existingAttempts = await Attempt.find({
      $and: [{ student: req.body.student }, { subtopic: req.body.subtopic }],
    });

    const newNumber =
      existingAttempts.length > 0
        ? Math.max(...existingAttempts.map((a) => a.number)) + 1
        : 0;

    const attempt = new Attempt({
      number: newNumber,
      starttime: req.body.starttime,
      endtime: req.body.endtime,
      duration: req.body.duration,
      score: req.body.score,
      levelscore: req.body.levelscore,
      student: req.body.student,
      subtopic: req.body.subtopic,
    });

    const newAttempt = await attempt.save();

    res.status(201).json({
      newAttempt,
      success: "Submitted Successfully!",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createAttempt;
