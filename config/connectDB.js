const { link } = require("fs");
const { MongoNetworkError } = require("mongodb");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const linkDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nhatdb.1zjcyme.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(linkDB);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error: ", error);
        process.exit(1);
    }
}

module.exports = connectDB;