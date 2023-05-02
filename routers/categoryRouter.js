const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");

// @ GET /api/category?quantity = 100&type=laptop&name=Lenovo
// @Desc: Get x
// @access: Public
router.get("/", async (req, res) => {
	let quantity = req.query.quantity;

	let Type = req.query.type;
	let TypeCondition = Type ? { $regex: Type, $options: 'i' } : null;

	let Name = req.query.name;
	let NameCondition = Name ? { $regex: Name, $options: 'i' } : null;
	// let NameCondition1 = Name ? { $regex: "i5", $options: 'i' } : null;

	try {
		let condition = {};
		if (TypeCondition) condition.Type = TypeCondition;
		if (NameCondition) condition.Name = NameCondition;
		// if (NameCondition1) condition.Name = NameCondition1;

		let sortCondition = {
			price: 1
		}

		let fieldGet = {
			__v: 0,
			Desc: 0
		}

		let JsonDB = await util.exportDBtoJSON(
			models.Category, condition, sortCondition, quantity, fieldGet
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
		let newCategory = {
			Type,
			Name,
			Desc,
			Price,
			Imgs
		};

		newCategory = await models.Category.findOneAndUpdate({ Name },
			newCategory,
			{ upsert: true, new: true, setDefaultsOnInsert: true });

		console.log(newCategory);

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
		let Category = await models.Category.findOne({ _id: id }, { __v: 0 });
		if (!Category) return handleResponse(res, 400, "Category is not existed!");
		Category.Desc = util.formatToJSON(Category.Desc);
		console.log(Category.Desc);

		let CategoryID = Category._id;
		let Products = await models.Product.find({ CategoryID }, { CategoryID: 0 }).populate("WebsiteID", ["Domain", "Icon"]);

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

// @ DELETE api/category/all=true
// @Desc: DELETE the category 
// @access: Public
router.delete("/", async (req, res) => {
	let isAll = req.query.all;
	if (!isAll) return handleResponse(res, 400);

	let isSuccess = await deleteCategory();
	if (isSuccess) return handleResponse(res, 200, "Delete all Category");
	else return handleResponse(res, 500);
})

const deleteCategory = async () => {
	try {
		await models.Category.deleteMany({});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

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
module.exports = { router, createCategory, deleteCategory };
