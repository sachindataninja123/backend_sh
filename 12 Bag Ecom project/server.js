require("dotenv").config();
const connectDb = require("./db/db");
const app = require("./src/app");

connectDb();

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
