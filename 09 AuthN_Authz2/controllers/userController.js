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
    res.render('login')
}

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports = { getUser, createUser, logoutUser , loginUser };
