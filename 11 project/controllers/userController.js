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
    let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
    res.cookie("token", token);
    if (result) res.status(200).redirect("/profile");
    else res.redirect("/login");
  });
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
};

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  // check if token exists
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  } catch (err) {
    return res.send("Invalid token");
  }
};

const profileRoute = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log(user);
  res.render("profile" , {user});
};

const getprofile = (req, res) => {
  res.render("profile");
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  login,
  logoutUser,
  profileRoute,
  isLoggedIn,
  getprofile,
};
