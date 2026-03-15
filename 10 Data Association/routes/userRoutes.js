const express = require("express");
const { getUser, creatUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUser);

router.get("/create", creatUser);

module.exports = router;
