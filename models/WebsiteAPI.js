const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WebsiteAPISchema = new Schema({
    Domain: {
        type: String,
        require: true,
        unique: true,
    },
    APILink: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("WebsiteAPI", WebsiteAPISchema);