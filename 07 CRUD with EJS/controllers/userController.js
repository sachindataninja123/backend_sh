const userModel = require("../models/userModel");

const getUsers = (req, res) => {
  res.render("index");
};

const allUsers = async (req, res) => {
  const users = await userModel.find();
  res.render("read", { users });
};

const createUser = async (req, res) => {
  const { name, email, image } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/users/all");
};

const deleteUser = async (req, res) => {
  await userModel.findOneAndDelete({
    _id: req.params.id,
  });

  res.redirect("/users/all");
};

const editUser = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });

  res.render("update", { user });
};

const updateUser = async (req, res) => {
  const { name, email, image } = req.body;

  let user = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { image, name, email },
    { new: true },
  );
  res.redirect("/users/all")
};

module.exports = {
  getUsers,
  allUsers,
  createUser,
  deleteUser,
  updateUser,
  editUser,
};
