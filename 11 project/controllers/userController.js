const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
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
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user });
};

const likeCount = async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  // console.log(req.params.id);
  // console.log(req.user)

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
};

const editPost = async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("edit", { post });
};

const updatePost = async (req, res) => {
  let post = await postModel.findOneAndUpdate({ _id: req.params.id} , {content : req.body.content} );

  res.redirect("/profile");
};

const getprofile = (req, res) => {
  res.render("profile");
};

const createPost = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  const { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
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
  createPost,
  likeCount,
  editPost,
  updatePost
};
