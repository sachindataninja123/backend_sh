const express = require("express");
const userRoutes = require("../routes/userRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);

module.exports = app;
