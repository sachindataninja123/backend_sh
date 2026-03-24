require("dotenv").config();
const connectDb = require("./db/db");
const app = require("./src/app");

connectDb();

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
