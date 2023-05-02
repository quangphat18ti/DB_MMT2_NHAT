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
      {},
      { lastModify: -1 },
      numWebsite
    );
    res.send(JsonDB);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, "Internal server problem!");
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let website = await models.Website.findOne({ _id: id });
    res.send(website);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, "Internal server problem!");
  }
});

// @ POST api/website
// @Desc: Create and Update Website
// @access: Public
router.post("/", async (req, res) => {
  let { Domain, Icon } = req.body;

  if (!Domain) return handleResponse(res, 400, "Domain is required!");
  Domain = util.getURLFromDomain(Domain);

  console.log("Domain =", Domain);
  Icon = Icon ? Icon : await util.getIcon(Domain);
  Icon = util.getURLFromDomain(Icon, Domain);
  console.log("Icon = ", Icon);

  let newWebsite = {
    Domain,
    Icon
  };

  newWebsite = await models.Website.findOneAndUpdate({ Domain }, newWebsite, { upsert: true, new: true, setDefaultsOnInsert: true });
  console.log(newWebsite);

  if (!newWebsite) return handleResponse(res, 500);
  else
    return handleResponse(
      res,
      201,
      "Create Website is Successfully!",
      newWebsite
    );
});

// @ DELETE api/website/id
// @Desc: DELETE Website by Domain
// @access: Public
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     let deleteWebsite = await models.Website.findOneAndDelete({ _id: id });
//     if (!deleteWebsite)
//       return handleResponse(res, 400, "Website is not existed!");
//     else
//       return handleResponse(
//         res,
//         200,
//         "Delete Website is Succesfully!",
//         deleteWebsite
//       );
//   } catch (error) {
//     console.log(error);
//     return handleResponse(res, 500);
//   }
// });

const createWebsite = async (Domain, Icon = null) => {
  if (!Domain) return null;
  Domain = util.getURLFromDomain(Domain);

  console.log("Domain =", Domain);
  Icon = Icon ? Icon : await util.getIcon(Domain);
  Icon = util.getURLFromDomain(Icon, Domain);
  console.log("Icon = ", Icon);

  try {
    let newWebsite = {
      Domain,
      Icon
    };

    newWebsite = await models.Website.findOneAndUpdate({ Domain }, newWebsite, { upsert: true, new: true, setDefaultsOnInsert: true });
    console.log(newWebsite);
    return newWebsite;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const DeleteWebsite = async () => {
  try {
    await models.Website.deleteMany({});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { router, createWebsite };
