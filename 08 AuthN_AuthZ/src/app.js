const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const token = jwt.sign({ email: "sachin@example.com" }, "secret"); // here secret is the main thing so always make it encrypted
  res.cookie("token", token);
  res.send("Cookie set successfully");
});

app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.get("/sign", (req, res) => {
  // encryption by bcrypt
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash("pololololoo", salt, (err, hash) => {
  //       console.log(hash);
  //     });
  //   });

  // decrypt by bcrypt
  bcrypt.compare(
    "pololololoo",
    " $2b$10$.DyhFsipHAH7q1/BwS9d/.91IvgBywdGVl4jHWAvoqZOB3QD4BxeC ",
    (err, result) => {
      console.log(result);
    },
  );
});

module.exports = app;
