const fs = require("fs");
const models = require("../models");

async function main() {
    let Category = await models.Category.find({});
    fs.writeFileSync("Category.json", JSON.stringify(Category));

    let Product = await models.Product.find({});
    fs.writeFileSync("Product.json", JSON.stringify(Product));
}
main();

module.exports = main;