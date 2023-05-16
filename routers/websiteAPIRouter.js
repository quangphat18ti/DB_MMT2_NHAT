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
            models.WebAPI,
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
    let { APILink } = req.body;

    if (!APILink) return handleResponse(res, 400, "APILink is required!");

    console.log(APILink);

    try {
        let newWebAPI = {
            APILink
        };

        newWebAPI = await models.WebAPI.findOneAndUpdate({ APILink },
            newWebAPI,
            { upsert: true, new: true, setDefaultsOnInsert: true });

        console.log(newWebAPI);

        return handleResponse(res, 201, "Create WebsiteAPI successfully", newWebisteAPI);

    } catch (error) {
        console.log(error);
        return handleResponse(res, 500);
    }

});

module.exports = router;
