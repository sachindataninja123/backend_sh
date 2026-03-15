const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postData: String,
  user: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
