const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = (req, res) => {
  res.render("index");
};

const createUser = (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      const token = jwt.sign({ email }, "shhhhhhhhh"); // be secure the security key
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
};

const loginUser = (req, res) => {
  res.render("login");
};

const logUser = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something went Wrong!");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "shhhhhhh");
      res.cookie("token", token);

      res.send("yes you can login");
    } else res.send("Something is wrong!");
  });
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports = { getUser, createUser, logoutUser, loginUser, logUser };
