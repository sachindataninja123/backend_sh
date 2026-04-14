const ownerModel = require("../models/owners.model");
const bcrypt = require("bcrypt");

const createOwner = async (req, res) => {
  try {
    let { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }

    let existingOwners = await ownerModel.findOne();

    if (existingOwners) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You don't have permission to create a new owner",
      });
    }

    const genSalt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, genSalt);

    const user = await ownerModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      error: false,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createOwner };
