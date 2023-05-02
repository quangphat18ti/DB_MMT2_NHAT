const website = require("./websiteRouter").router;
const category = require("./categoryRouter").router;
const product = require("./productRouter").router;

const DeleteWebsite = require("./websiteRouter").DeleteWebsite;
const DeleteCategory = require("./categoryRouter").DeleteCategory;
const DeleteProduct = require("./productRouter").DeleteProduct;

module.exports = { website, category, product, DeleteWebsite, DeleteCategory, DeleteProduct };
