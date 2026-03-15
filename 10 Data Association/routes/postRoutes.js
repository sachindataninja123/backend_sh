const express = require("express");
const { createPost } = require("../controllers/postController");
const router = express.Router();

router.get("/create/post", createPost);

module.exports = router;
