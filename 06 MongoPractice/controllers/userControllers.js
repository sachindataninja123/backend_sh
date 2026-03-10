const userModel = require("../model/usermodel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      message: "User fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in creating User");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updateUser = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "User Update Successfully",
      user: updateUser,
    });
  } catch (error) {
    res.send(500).json({
      message: "Server error",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deleteUser = await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User delete Successfully",
      deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

module.exports = { getUsers, createUser, updateUser , deleteUser};
