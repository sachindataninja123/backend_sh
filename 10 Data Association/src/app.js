const express = require("express");
const userRoutes = require("../routes/userRoutes");
const postRoutes = require("../routes/postRoutes");

const app = express();

app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);

module.exports = app;
