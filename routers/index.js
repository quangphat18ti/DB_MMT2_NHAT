const website = require("./websiteRouter").router;
const category = require("./categoryRouter").router;
const product = require("./productRouter").router;
const websiteAPI = require("./websiteAPIRouter");

const DeleteWebsite = require("./websiteRouter").DeleteWebsite;
const DeleteCategory = require("./categoryRouter").DeleteCategory;
const DeleteProduct = require("./productRouter").DeleteProduct;

module.exports = { websiteAPI, website, category, product, DeleteWebsite, DeleteCategory, DeleteProduct };
