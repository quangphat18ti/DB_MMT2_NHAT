const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WebisteSchema = new Schema({
  Domain: {
    type: String,
    require: true,
    unique: true,
  },
  Icon: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
  },
  LastModify: {
    type: Date,
    default: Date.now,
  },
});

WebisteSchema.post("save", function () {
  // In 'save' middleware, `this` is the document being saved.
  // console.log('Save', this);
  return this;
});

module.exports = mongoose.model("Website", WebisteSchema);
