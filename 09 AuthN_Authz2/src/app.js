const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("../routes/userRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

app.use("/", userRoutes);

module.exports = app;
