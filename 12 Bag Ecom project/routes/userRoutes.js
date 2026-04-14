const express = require("express");
const { createuser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

router.post("/register", createuser);
router.post("/login", loginUser);

module.exports = router;
