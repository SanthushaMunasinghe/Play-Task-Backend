const Admin = require("../../models/Admin");

async function getAdmins(req, res) {
  try {
    const admin = await Admin.find({ institution: req.params.institution });
    if (!admin) {
      res.status(404).json({ message: "Admins Not Found" });
    } else {
      res.status(200).json(admin);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getAdmins;
