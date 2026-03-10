const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.patch("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
