const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  posts: [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }
  ],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
