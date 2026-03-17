const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  res.render("index");
};

const registerUser = async (req, res) => {
  console.log("REGISTER HIT");
  const { email, name, username, password, age } = req.body;
  console.log(req.body);

  let user = await userModel.findOne({ email });
  if (user) return res.status(409).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    name,
    email,
    username,
    password: hash,
    age,
  });

  let token = jwt.sign({ email: email, userId: newUser._id }, "shhhh");
  res.cookie("token", token);

  res.send({
    message: "User Registered",
    user: newUser,
  });
};

const login = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("something went wrong!");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) res.status(200).send("You can login");
    else res.redirect("/login");
  });
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
};

module.exports = { getUsers, registerUser, loginUser, login , logoutUser };
