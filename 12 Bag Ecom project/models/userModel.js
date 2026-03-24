// usermodel
// full Name - String
// email - String
// password - String
// cart - Array
// isAdmin - Boolean
// orders - Array
// contact - Number
// picture

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
