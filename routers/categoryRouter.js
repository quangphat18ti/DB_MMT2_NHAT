const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");

// @ GET api/category?quantity = x
// @Desc: Get x
// @access: Public
router.get("/", async (req, res) => {
	const numProduct = req.query.quantity || process.env.DEFAULT_QUANTITY;
	console.log(`numProduct = ${numProduct}`);
	try {
		let JsonDB = await util.exportDBtoJSON(
			models.Category,
			{ price: 1 },
			numProduct
		);
		res.send(JsonDB);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500, "Internal server problem!");
	}
});

// @ POST api/category
// @Desc: Create category without product
// @access: Public
router.post("/", async (req, res) => {
	let { Name, Type, Desc, Price, Imgs } = req.body;

	if (!Name) return handleResponse(res, 400, "Name is required!");

	Type = Type ? Type : util.getTypeOfProduct(Name);
	Type = Type ? Type : "Laptop";
	const Regex = new RegExp(/${Type}/i);
	if (Name.search(Regex) == -1) Name = `${Type} ${Name}`;

	try {
		let Category = await models.Category.findOneAndDelete({ Name });

		if (Category)
			console.log("Delete Category: ", Category);

		let newCategory = await createCategory(Name, Type, Desc, Price, Imgs);

		if (!newCategory)
			return handleResponse(res, 500);

		return handleResponse(
			res,
			201,
			"Create Category Successfully",
			newCategory
		);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});

// @ GET api/category/Name
// @Desc: get object information of the category with "Name"
// @access: Public
router.get("/:id", async (req, res) => {
	let id = req.params.id;

	try {
		let Category = await models.Category.findOne({ _id: id });
		if (!Category) return handleResponse(res, 400, "Category is not existed!");
		let CategoryID = Category._id;

		let Products = await models.Product.find({ CategoryID });

		res.send({ Category, Products });
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});

// @ DELETE api/category/Name
// @Desc: DELETE the category with "Name"
// @access: Public
router.delete("/:id", async (req, res) => {
	let id = req.params.id;

	try {
		let Category = await models.Category.findOneAndDelete({ _id: id });
		if (!Category) {
			return handleResponse(res, 400, "Category is not existed!");
		}

		return handleResponse(res, 200, "Delete Category Successful", Category);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500, "Internal server problem!");
	}
});

const createCategory = async (Name, Type, Desc, Price, Imgs) => {
	try {
		let newCategory = new models.Category({
			Type,
			Name,
			Desc,
			Price,
			Imgs
		});

		newCategory = await newCategory.save();
		return newCategory;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// @ POST api/category/Name
// @Desc: Create category without product
// @access: Public
module.exports = { router, createCategory };
