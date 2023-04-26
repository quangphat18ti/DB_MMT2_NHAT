const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");

// @ GET api/website
// @Desc: Get ?quantity Website
// @access: Public
router.get("/", async (req, res) => {
  const numWebsite = req.query.quantity || process.env.DEFAULT_QUANTITY;
  console.log(`numWebsite = ${numWebsite}`);
  try {
    let JsonDB = await util.exportDBtoJSON(
      models.Website,
      { lastModify: -1 },
      numWebsite
    );
    res.send(JsonDB);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, "Internal server problem!");
  }
});

// @ POST api/website
// @Desc: Create Website
// @access: Public
router.post("/", async (req, res) => {
  let { Domain, Icon } = req.body;

  if (!Domain) return handleResponse(res, 400, "Domain is required!");

  let newWebsite = await createWebsite(Domain, Icon);
  if (!newWebsite) return handleResponse(res, 500);
  else
    return handleResponse(
      res,
      201,
      "Create Website is Successfully!",
      newWebsite
    );
});

// @ DELETE api/website
// @Desc: DELETE Website by Domain
// @access: Public
router.delete("/", async (req, res) => {
  let Domain = req.query.domain;
  if (!Domain) return handleReponse(res, 400, "Domain is required!");
  Domain = util.getDomain(Domain);
  console.log(Domain);

  try {
    let deleteWebsite = await models.Website.findOneAndDelete({ Domain });
    if (!deleteWebsite)
      return handleResponse(res, 400, "Website is not existed!");
    else
      return handleResponse(
        res,
        200,
        "Delete Website is Succesfully!",
        deleteWebsite
      );
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500);
  }
});
const createWebsite = async (Domain, Icon = null) => {
  if (!Domain) return null;
  Domain = util.getURLFromDomain(Domain);

  try {
    const website = await models.Website.findOneAndDelete({ Domain });
    if (website) {
      if (!Icon) Icon = website.Icon;
      const updateWebsite = new models.Website({
        Domain,
        Icon,
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
      Icon,
    });
    newWebsite = await newWebsite.save();
    return newWebsite;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { router, createWebsite };
