const mongoose = require("mongoose");
const util = require("../util");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Type: {
    type: String,
    default: "Laptop",
  },
  Name: {
    type: String,
    require: true,
    unique: true,
  },
  Price: {
    type: Number,
    default: 1000000000
  },
  Imgs: [{
    type: String
  }],
  Desc: {
    type: String,
    default: "",
  },
});

CategorySchema.pre("save", function () {
  // In 'save' middleware, `this` is the document being saved.
  if (!this.Type) this.Type = util.getTypeOfProduct(this.Name);
});

CategorySchema.post("save", function () {
  // In 'save' middleware, `this` is the document being saved.
  // console.log('Save', this);
  return this;
});

CategorySchema.post("save", function () {
  // In 'save' middleware, `this` is the document being saved.
  // console.log('Save', this);
  return this;
});

module.exports = mongoose.model("Category", CategorySchema);
