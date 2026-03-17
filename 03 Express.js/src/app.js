const express = require("express");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Middleware chala");
  next()
});

app.get("/", (req, res) => {
  res.send("Hii this is my first backend!");
});

app.get("/profile", (req, res) => {
  res.send("Hii this is my first backend and this is profile route!");
});

module.exports = app;
