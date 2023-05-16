const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WebsiteAPISchema = new Schema({
    APILink: {
        type: String,
        require: true,
    }
})

WebsiteAPISchema.post("save", function () {
    return this;
});

module.exports = mongoose.model("WebsiteAPI", WebsiteAPISchema);