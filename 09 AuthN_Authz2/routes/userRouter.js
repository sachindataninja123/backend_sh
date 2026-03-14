const express = require("express");
const {
  getUser,
  createUser,
  logoutUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUser);

router.post("/create", createUser);

router.get("/logout", logoutUser);

router.get("/login", loginUser);

module.exports = router;
