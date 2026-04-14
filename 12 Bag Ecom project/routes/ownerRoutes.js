const express = require("express");
const { createOwner } = require("../controllers/ownerController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("owner");
});

router.post("/create", createOwner);

module.exports = router;
