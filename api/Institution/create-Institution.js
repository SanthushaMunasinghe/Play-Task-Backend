const Institution = require("../../models/Institution");

const bcrypt = require("bcrypt");

async function createInstitution(req, res) {
  try {
    const existingInst = await Institution.findOne({
      $or: [
        { name: req.body.name },
        { email: req.body.email },
        { contactno: req.body.contactno },
      ],
    });
    if (existingInst) {
      res.status(400).json({
        message: "Institution Name, Email Or Contact Number Already Exists",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const institution = new Institution({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location,
        email: req.body.email,
        contactno: req.body.contactno,
        password: hashedPassword,
      });
      const newInst = await institution.save();
      res.status(201).json({ institutionId: newInst._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createInstitution;
