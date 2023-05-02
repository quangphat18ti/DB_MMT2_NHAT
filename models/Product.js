const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    Url: {
        type: String,
        require: true,
        unique: true
    },
    Name: {
        type: String,
    },
    Price: {
        type: Number,
        require: true,
    },
    OriginalPrice: {
        type: Number
    },
    Imgs: [
        {
            type: String,
        },
    ],
    WebsiteID: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        require: true,
    },
    CategoryID: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true,
    }
})

ProductSchema.post("save", function () {
    // In 'save' middleware, `this` is the document being saved.
    // console.log('Save', this);
    return this;
});

module.exports = mongoose.model("Product", ProductSchema);