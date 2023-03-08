const Admin = require("../../models/Admin");

async function getAdmin(req, res) {
  try {
    const admin = await Admin.findOne({ _id: req.params.id });
    if (!admin) {
      res.status(404).json({ message: "Admin Not Found" });
    } else {
      if (req.params.type == "id") {
        res.status(200).json({
          id: admin._id,
          name: admin.name,
          authorization: admin.authorization,
        });
      } else {
        res.status(200).json({
          id: admin._id,
          name: admin.name,
          authorization: admin.authorization,
          email: admin.email,
          contactno: admin.contactno,
          home: admin.home,
          institution: admin.institution,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = getAdmin;
