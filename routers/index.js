const website = require("./websiteRouter").router;
const category = require("./categoryRouter").router;
const product = require("./productRouter").router;

module.exports = { website, category, product };
