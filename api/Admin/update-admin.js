const Admin = require("../../models/Admin");

async function updateAdmin(req, res) {
  try {
    const existingAdmin = await Admin.find({
      $and: [
        {
          $or: [
            { name: req.body.name },
            { email: req.body.email },
            { contactno: req.body.contactno },
          ],
        },
        { institution: req.params.institution },
      ],
    });
    if (existingAdmin.length != 0) {
      res.status(400).json({ message: "Admin Already Exists" });
    } else {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        res.status(404).json({ message: "Admin Not Found" });
      }
      admin.name = req.body.name ? req.body.name : admin.name;
      admin.email = req.body.email ? req.body.email : admin.email;
      admin.contactno = req.body.contactno
        ? req.body.contactno
        : admin.contactno;
      admin.home = req.body.home ? req.body.home : admin.home;
      await admin.save();
      res.status(200).json({ message: "Admin updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = updateAdmin;
