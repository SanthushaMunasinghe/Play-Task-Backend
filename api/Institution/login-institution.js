const Institution = require("../../models/Institution");

const bcrypt = require("bcrypt");

async function institutionLogin(req, res) {
  try {
    const institution = await Institution.findOne({
      email: req.body.email,
    });
    if (!institution) {
      res.status(404).json({ message: "Institution Not Found" });
    } else {
      const isPasswordCorrect = await bcrypt.compareSync(
        req.body.password,
        institution.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Incorrect Password" });
      } else {
        res.status(200).json({
          institutionId: institution._id,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = institutionLogin;
