const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const createPost = async (req, res) => {
  let post = await postModel.create({
    postData: "hello saare log kaise ho",
    user: "69b6c30fc7b8f7f7a8365e57",
  });

  let user = await userModel.findOne({ _id: "69b6c30fc7b8f7f7a8365e57" });
  user.posts.push(post._id);
  await user.save()

  res.send({post , user});
};


module.exports = {createPost}