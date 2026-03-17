const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Server is connected Successfully");
  } catch (error) {
    console.log("Server connection failed");
  }
};

module.exports = connectDB;
