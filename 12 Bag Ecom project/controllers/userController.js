const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

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

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User already Exists!",
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

    let token = generateToken(createdUser);
    res.cookie("token", token);

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide email , password",
      });
    }

    const existUser = await userModel.findOne({ email: email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not exists!",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, existUser.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password is incorrect!",
      });
    }

    const token = generateToken(existUser);
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      error: false,
      message: "you are login!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { createuser, loginUser };
