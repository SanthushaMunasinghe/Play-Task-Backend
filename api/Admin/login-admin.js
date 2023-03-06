const Admin = require("../../models/Admin");
const Institution = require("../../models/Institution");

const bcrypt = require("bcrypt");

async function institutionLogin(req, res) {
  try {
    const inst = await Institution.findOne({ _id: req.body.institution });
    if (!inst) {
      res.status(404).json({ message: "Institution Not Found" });
    } else {
      const admin = await Admin.findOne({
        $and: [{ email: req.body.email }, { institution: inst._id }],
      });
      if (!admin) {
        res.status(404).json({ message: "User Not Found" });
      } else {
        const isPasswordCorrect = await bcrypt.compareSync(
          req.body.password,
          admin.password
        );
        if (!isPasswordCorrect) {
          res.status(401).json({ message: "Incorrect password" });
        } else {
          res.status(200).json({
            userid: admin._id,
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = institutionLogin;
