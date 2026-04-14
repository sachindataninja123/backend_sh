const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createuser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide full name , email , password",
      });
    }

    // generate salt
    const genSalt = await bcrypt.genSalt(10);

    // hash password
    const hashPassword = await bcrypt.hash(password, genSalt);
    console.log(hashPassword);

    let createdUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      error: false,
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createuser };
