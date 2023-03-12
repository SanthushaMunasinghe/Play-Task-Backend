const Institution = require("../../models/Institution");

async function updateInstitution(req, res) {
  try {
    const existingInstitution = await Institution.find({
      $or: [
        { name: req.body.name },
        { email: req.body.email },
        { contactno: req.body.contactno },
      ],
    });
    if (existingInstitution.length != 0) {
      res.status(400).json({ message: "Institution Already Exists" });
    } else {
      const institution = await Institution.findById(req.params.id);
      if (!institution) {
        res.status(404).json({ message: "Institution Not Found" });
      }
      institution.name = req.body.name ? req.body.name : institution.name;
      institution.email = req.body.email ? req.body.email : institution.email;
      institution.contactno = req.body.contactno
        ? req.body.contactno
        : institution.contactno;
      institution.location = req.body.location
        ? req.body.location
        : institution.location;
      await institution.save();
      res.status(200).json({ message: "Teacher updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateInstitution;
