const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  name: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
