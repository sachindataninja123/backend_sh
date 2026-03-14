const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("../models/userModel");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
