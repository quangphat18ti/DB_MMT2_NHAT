const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");


// @ GET api/website
// @Desc: Get all Website
// @access: Public 

// router.get("/", (req, res) => {
//     res.send("Hello. Đây là Website API");
// })
router.get("/", async (req, res) => {
    const numProduct = req.query.quantity || 2;
    console.log(`numProduct = ${numProduct}`);
    try {
        let JsonDB = await util.exportDBtoJSON(models.Website, { lastModify: -1 }, numProduct);
        res.send(JsonDB);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, 'Internal server problem!');
    }
})

// @ POST api/website
// @Desc: Create Website
// @access: Public 
router.post("/", async (req, res) => {
    let { Domain, Icon } = req.body;

    if (!Domain)
        return handleResponse(res, 400, "Domain is required!");

    Domain = util.getURLFromDomain(Domain);

    try {
        const website = await models.Website.findOneAndDelete({ Domain });
        if (website) {
            if (!Icon) Icon = website.Icon;
            const updateWebsite = new models.Website({
                Domain,
                Icon
            });
            await updateWebsite.save();
            return handleResponse(res, 201, " Update Website is successfully!", updateWebsite);
        }

        console.log("Domain =", Domain);
        Icon = Icon ? Icon : await util.getIcon(Domain);
        Icon = util.getURLFromDomain(Icon, Domain);
        console.log("Icon = ", Icon);

        let newWebsite = new models.Website({
            Domain,
            Icon
        });
        newWebsite = await newWebsite.save();

        return res.status(201).json({ success: true, message: "Create Website is successfully!", newWebsite });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Problem!" });
    }
})

const createWebsite = async (Domain, Icon = null) => {
    if (!Domain) return null;
    Domain = util.getURLFromDomain(Domain);

    try {
        const website = await models.Website.findOneAndDelete({ Domain });
        if (website) {
            if (!Icon) Icon = website.Icon;
            const updateWebsite = new models.Website({
                Domain,
                Icon
            });
            await updateWebsite.save();
            return updateWebsite;
        }

        console.log("Domain =", Domain);
        Icon = Icon ? Icon : await util.getIcon(Domain);
        Icon = util.getURLFromDomain(Icon, Domain);
        console.log("Icon = ", Icon);

        let newWebsite = new models.Website({
            Domain,
            Icon
        });
        newWebsite = await newWebsite.save();
        return newWebsite;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { router, createWebsite };

