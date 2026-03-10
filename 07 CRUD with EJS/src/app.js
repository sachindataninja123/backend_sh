const express = require("express");
const path = require("path");
const userRoutes = require("../routes/userRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/users", userRoutes);

module.exports = app;
