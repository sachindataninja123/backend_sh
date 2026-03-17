const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  login,
  logoutUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.get("/login", login);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
