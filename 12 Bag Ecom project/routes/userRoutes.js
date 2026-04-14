const express = require("express");
const { createuser } = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

router.post("/register", createuser);

module.exports = router;
