const express = require("express");
const {
  getUsers,
  createUser,
  allUsers,
  deleteUser,
  updateUser,
  editUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.get("/all", allUsers);

router.post("/create", createUser);
router.get("/delete/:id", deleteUser);

router.get("/edit/:id", editUser);

router.post("/update/:id", updateUser);

module.exports = router;
