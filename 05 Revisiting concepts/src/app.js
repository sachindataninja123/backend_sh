const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  const filesPath = path.join(__dirname, "..", "files");
  fs.readdir(filesPath, (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      return res.status(500).send("Unable to read files");
    }
    // console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  const fileName = req.body.title.split(" ").join("") + ".txt";
  const filesPath = path.join(__dirname, "..", "files", fileName);

  fs.writeFile(filesPath, req.body.details, (err) => {
    if (err) {
      console.log("Error creating file:", err);
      return res.status(500).send("Unable to create file");
    }
    res.redirect("/");
  });
});

module.exports = app;
