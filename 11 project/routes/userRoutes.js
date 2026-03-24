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
  createPost,
  likeCount,
  editPost,
  updatePost,
  uploadProfile,
  uploadPicture,
} = require("../controllers/userController");
const router = express.Router();
const multerConfig = require("../utils/multer.config");

router.get("/", getUsers);
router.post("/register", registerUser);
router.get("/login", login);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/profile", isLoggedIn, profileRoute);
router.get("/profile", getprofile);

router.post("/post", isLoggedIn, createPost);

router.get("/like/:id", isLoggedIn, likeCount);

router.get("/edit/:id", isLoggedIn, editPost);

router.post("/update/:id", isLoggedIn, updatePost);

router.get("/profile/upload", uploadProfile);

router.post("/upload", isLoggedIn ,  multerConfig.single("image"), uploadPicture);

module.exports = router;
