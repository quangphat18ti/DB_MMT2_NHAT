const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");

// @ GET api/category?quantity = x
// @Desc: Get x 
// @access: Public 
router.get("/", async (req, res) => {
    const numProduct = req.query.quantity || 2;
    console.log(`numProduct = ${numProduct}`);
    try {
        let JsonDB = await util.exportDBtoJSON(models.Category, { price: 1 }, numProduct);
        res.send(JsonDB);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, 'Internal server problem!');
    }
})

// @ POST api/category
// @Desc: Create category without product
// @access: Public 
router.post("/", async (req, res) => {
    const { Type, Name } = req.body;
    if (!Name) {
        return handleResponse(res, 400, "Name is required!");
    }

    Type = Type ? Type : util.getTypeOfProduct(Name);

    let newCategory = new models.Category({
        Type,
        Name
    })

    newCategory = await Category.save();

    return handleResponse(res, 201, "Create Category Successfully", Category);
})

// @ GET api/category/Name
// @Desc: get object information of the category with "Name"
// @access: Public 
router.get("/:Name", async (req, res) => {
    let Name = req.params.Name;
    const a = Name.split('-');
    Name = a.reduce((prev, cur) => prev + " " + cur);
    console.log(Name);
    if (!Name) {
        return handleResponse(res, 400, "Name is required!");
    }

    try {
        let Category = await models.Category.findOne({ Name });
        if (!Category) {
            const newCategory = new models.Category({
                Name
            })
            Category = await newCategory.save();
            console.log(`Create new Cate: ${Category}`);
        }

        return handleResponse(res, 200, "Get Category Successful", Category);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, 'Internal server problem!');
    }
})


const createCategory = async (Name, Type) => {
    if (!Name) return null;

    Type = Type ? Type : util.getTypeOfProduct(Name);

    let newCategory = new models.Category({
        Type,
        Name
    })

    newCategory = await Category.save();

    return newCategory;
}

// @ POST api/category/Name
// @Desc: Create category without product
// @access: Public 
module.exports = { router, createCategory };