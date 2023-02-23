const Institution = require("../../models/Institution");

async function getInstitution(req, res) {
  try {
    const institution = await Institution.find({ name: req.params.name });
    if (!institution) {
      res.status(404).json({ message: "Institution does not exists" });
    } else {
      res.status(200).json(institution);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getInstitution;
