const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Server is connected with database");
    } catch (error) {
       console.log("Error in connection with Database") 
    }
}

module.exports = connectDB