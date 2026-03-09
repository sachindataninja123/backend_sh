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

app.get("/file/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filesPath = path.join(__dirname, "..", "files", fileName);

  fs.readFile(filesPath, "utf-8", (err, fileData) => {
    if (err) {
      console.log("Error reading file : ", err);
      return res.status(404).send("file not found");
    }
    res.render("show", { fileName: fileName, fileData: fileData });
  });
});

app.get("/edit/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filesPath = path.join(__dirname, "..", "files", fileName);

  fs.readFile(filesPath, "utf-8", (err, filedata) => {
    if (err) {
      console.log("Error reading file", err);
      return res.status(400).send("File not found");
    }
    res.render("edit", { fileName: fileName });
  });
});

app.post("/edit", (req, res) => {
  const previousName = req.body.previous;
  const newName = req.body.new;

  const oldPath = path.join(__dirname, "..", "files", previousName);
  const newPath = path.join(__dirname, "..", "files", newName);

  fs.rename(oldPath, newPath, (err, fileContent) => {
    if (err) {
      console.log("Error in Updating", err);
      return res.status(404).send("fileName not updated");
    }
    res.redirect("/");
  });

  fs.rename;
});

module.exports = app;
