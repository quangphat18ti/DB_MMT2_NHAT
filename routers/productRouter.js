const express = require("express");
const router = express.Router();
const models = require("../models");
const handleResponse = require("../common/response");
const util = require("../util");
const createWebsite = require("./websiteRouter").createWebsite;
const createCategory = require("./categoryRouter").createCategory;

// @ POST api/product
// @Desc: Create and Update product
// @access: Public
router.post("/", async (req, res) => {
	let { Url, Type, Name, Price, OriginalPrice, NameCategory, Imgs, Desc } =
		req.body;

	if (!Url) return handleResponse(res, 400, "Url is required for Product!");
	if (!Price) return handleResponse(res, 400, "Price is required for Product!");
	if (!NameCategory) return handleResponse(res, 400, "Category is required for Product!");

	try {
		let product = await models.Product.findOneAndDelete({ Url });
		if (product) console.log("Delete Product = ", product);

		let domainLink = util.getDomain(Url);
		let WebsiteID = await models.Website.findOne(
			{ Domain: domainLink },
			{ _id: 1 }
		);
		if (!WebsiteID) WebsiteID = await createWebsite(domainLink)._id;

		let Category = await models.Category.findOne({
			Name: NameCategory,
		});
		if (!Category) Category = await createCategory(NameCategory, Type);

		let CategoryID = Category._id;
		let newProduct = new models.Product({
			Url,
			Name,
			Price,
			OriginalPrice,
			Imgs,
			WebsiteID,
			CategoryID,
		});
		newProduct = await newProduct.save();
		console.log(newProduct);
		try {
			if (!Category.Desc && Desc) {
				Category.Desc = Desc;
			}

			const updatedCategory = await models.Category.findOneAndUpdate(
				{ _id: Category._id },
				Category,
				{
					new: true,
				}
			);

			console.log(`updated Category = ${updatedCategory}`);

			return handleResponse(
				res,
				201,
				"Create Product Successfully",
				newProduct
			);
		} catch (error) {
			console.log(error);
			await models.Product.findOneAndDelete({ Url });
		}
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});

// @ GET api/product
// @Desc: Get ?quantity Product
// @access: Public
router.get("/", async (req, res) => {
	const numProduct = req.query.quantity || process.env.DEFAULT_QUANTITY;
	console.log(`Number Product = ${numProduct}`);
	try {
		let JsonDB = await util.exportDBtoJSON(
			models.Product,
			{ Price: 1 },
			numProduct
		);

		res.send(JsonDB);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});

// @ GET api/product/:id
// @Desc: Get Product by ID
// @access: Public
router.get("/:id", async (req, res) => {
	let id = req.params.id;

	try {
		let product = models.Product.findOne({ _id: id });
		if (!product) return handleResponse(res, 400, "Product is not existed!");
		res.send(product);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});

module.exports = router;
