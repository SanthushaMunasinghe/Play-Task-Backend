const Admin = require("../../models/Admin");

const bcrypt = require("bcrypt");

async function createAdmin(req, res) {
  try {
    const existingAdmin = await Admin.findOne({
      $and: [
        {
          $or: [
            { name: req.body.name },
            { email: req.body.email },
            { contactno: req.body.contactno },
          ],
        },
        { institution: req.body.institution },
      ],
    });
    if (existingAdmin) {
      res.status(400).json({
        message:
          "Admin Name, Email Or Contact Number Already Exists In This Institution",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        contactno: req.body.contactno,
        authorization: req.body.authorization,
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
