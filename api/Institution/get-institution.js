const Institution = require("../../models/Institution");

async function getInstitution(req, res) {
  try {
    const institution = await Institution.findOne({ _id: req.params.id });
    if (!institution) {
      res.status(404).json({ message: "Institution Not Found" });
    } else {
      if (req.params.type == "id") {
        res.status(200).json({
          id: institution._id,
          name: institution.name,
        });
      } else {
        res.status(200).json({
          id: institution._id,
          name: institution.name,
          type: institution.type,
          email: institution.email,
          contactno: institution.contactno,
          location: institution.location,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getInstitution;
