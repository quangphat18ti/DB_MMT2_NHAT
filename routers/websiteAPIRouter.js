const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");

// @ GET api/websiteAPI
// @Desc: Get ?quantity WebsiteAPI
// @access: Public
router.get("/", async (req, res) => {
    const numWebsite = req.query.quantity || process.env.DEFAULT_QUANTITY;
    console.log(`numWebsite = ${numWebsite}`);
    try {
        let JsonDB = await util.exportDBtoJSON(
            models.Website,
            {},
            numWebsite
        );
        res.send(JsonDB);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, "Internal server problem!");
    }
});

// @ POST api/websiteAPI
// @Desc: Create WebsiteAPI
// @access: Public
router.post("/", async (req, res) => {
    let { Domain, APILink } = req.body;

    if (!Domain) return handleResponse(res, 400, "Domain is required!");
    if (!APILink) return handleResponse(res, 400, "APILink is required!");

    try {
        let newWebisteAPI = new models.WebAPI(
            Domain,
            APILink,
        );
        newWebisteAPI = await newWebisteAPI.save();

        return handleResponse(res, 201, "Create WebsiteAPI successfully", newWebisteAPI);

    } catch (error) {
        console.log(error);
        return handleResponse(res, 500);
    }

});

module.exports = { router, createWebsite };
