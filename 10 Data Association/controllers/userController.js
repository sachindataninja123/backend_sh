const userModel = require("../models/userModel");

const getUser = (req, res) => {
  res.send("hey");
};

const creatUser = async (req, res) => {
  let user = await userModel.create({
    username: "Sachin",
    age: 20,
    email: "sachin@testgmail.com",
  });

  res.send(user);
};

module.exports = { getUser, creatUser };
