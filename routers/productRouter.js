const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");
const createWebsite = require('./websiteRouter');
const createCategory = require('./categoryRouter');

// @ POST api/product
// @Desc: Create product
// @access: Public 

router.post("/", async (res, req) => {
    const { Url, Type, Name, Price, OriginalPrice, NameCategory, Imgs, Desc } = res.body;

    if (!Url)
        return handleResponse(res, 400, "Url is required for Product!");

    if (!Price)
        return handleResponse(res, 400, "Price is required for Product!");

    if (!NameCategory)
        return handleResponse(res, 400, "Category is required for Product!");

    try {
        let domainLink = util.getDomain(URL);
        let websiteID = models.Product.findOne({ domainLink }, { _id: 1 });
        if (!websiteID) websiteID = await createWebsite(domainLink)._id;


        let CategoryID = await models.Category.findOne({ Name: NameCategory }, { _id: 1 });
        if (!CategoryID) CategoryID = await createCategory(Name, Type)._id;

        let newProduct = {
            Url,
            Name,
            Price,
            OriginalPrice,
            websiteID,
            CategoryID,
        };

        newProduct = await newProduct.save();

        // update Product For Category


    } catch (error) {

    }
});

module.exports = router;