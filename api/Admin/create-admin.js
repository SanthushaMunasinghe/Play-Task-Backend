const Admin = require("../../models/Admin");

const bcrypt = require("bcrypt");

async function createAdmin(req, res) {
  try {
    const existingAdmin = await Admin.findOne({
      $or: [
        { name: req.body.name },
        { email: req.body.email },
        { contactno: req.body.contactno },
      ],
    });
    if (existingAdmin) {
      res
        .status(400)
        .json({
          message: "Admin name, email or contact number already exists",
        });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        contactno: req.body.contactno,
        home: req.body.home,
        institution: req.body.institution,
        password: hashedPassword,
      });
      const newAdmin = await admin.save();
      res.status(201).json({ adminId: newAdmin._id });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createAdmin;
