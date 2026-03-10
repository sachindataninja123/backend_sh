const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is coonected to database");
  } catch (error) {
    console.log("Error in connected Database");
  }
}

module.exports = connectDB