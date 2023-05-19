const models = require("../models");
const axios = require("axios");

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

async function updateProduct() {
    let categories = await models.Category.find({});

    categories.forEach(async (category) => {
        category = category.toObject();
        let products = await models.Product.find({ CategoryID: category._id }, { Price: 1 });

        if (products.length == 0) {
            let response = await axios.delete(`https://db-mmt-2-nhat.vercel.app/api/category/${category._id}`);
            console.log(response);
        }

        try {
            // update nProduct
            category.nProduct = products.length;

            // update Price
            let minPrice = products[0].Price;
            for (let i = 0; i < products.length; i++)
                minPrice = Math.min(minPrice, products[i].Price);

            category.Price = minPrice;
            category = await models.Category.findOneAndUpdate({ _id: category._id }, category, { upsert: true, new: true, setDefaultsOnInsert: true })
            console.log(category);
        }
        catch (error) {
            console.log("Id Error = ", category._id);
            // console.log("err = ", error);
        }
    })
}

async function updateDB() {
    console.log("Start Update Database!!!");
    await crawler();
    updateProduct();
}

module.exports = updateDB;