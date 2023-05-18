const models = require("../models");

async function crawler() {
    const apiLinks = await models.WebAPI.find({}, { APILink: 1 });

    apiLinks.forEach(api => {
        try {
            fetch(api.APILink)
                .then(response => response.text())
                .then(response => {
                    console.log(`Call API (${api.APILink}) successfully!`);
                    console.log(response);
                })
                .catch(err => {
                    console.log(`Call API (${api.APILink}) fail!`);
                    console.log(err)
                });
        }
        catch (err) {
            console.log(err);
        }
    })
}

async function updatePrice() {
    let categories = await models.Category.find({});

    categories.forEach(async (category) => {
        let products = await models.Product.find({ CategoryID: category._id }, { Price: 1 });

        try {
            let minPrice = products[0].Price;
            for (let i = 0; i < products.length; i++)
                minPrice = Math.min(minPrice, products[i].Price);

            category.Price = minPrice;
            category = await models.Category.findOneAndUpdate({ _id: category._id }, category, { upsert: true, new: true, setDefaultsOnInsert: true })
            // console.log(category);
        }
        catch (error) {
            console.log("Id Error = ", category._id);
            // console.log("err = ", error);
        }
    })
}

async function updateDB() {
    console.log("Start Update Database!!!");
    crawler();
    updatePrice();
}

module.exports = updateDB;