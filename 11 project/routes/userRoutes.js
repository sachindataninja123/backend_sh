const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  login,
  logoutUser,
  profileRoute,
  isLoggedIn,
  getprofile,
  createPost
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.get("/login", login);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/profile", isLoggedIn, profileRoute);
router.get("/profile", getprofile);

router.post("/post", isLoggedIn, createPost);

module.exports = router;
