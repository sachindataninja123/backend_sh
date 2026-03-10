const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  image: String,
  email: String,
  name: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
