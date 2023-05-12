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
		let newProduct = {
			Url,
			Name,
			Price,
			OriginalPrice,
			Imgs,
			WebsiteID,
			CategoryID,
		};
		newProduct = await models.Product.findOneAndUpdate({ Url }, newProduct, { upsert: true, new: true, setDefaultsOnInsert: true });
		console.log(newProduct);
		try {
			if (!Category.Desc && Desc) {
				Category.Desc = Desc;
			}

			if (Category.Price > Price)
				Category.Price = Price;

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
	let quantity = req.query.quantity;

	try {
		let JsonDB = await util.exportDBtoJSON(
			models.Product,
			{},
			{ Price: 1 },
			quantity
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
		let product = await models.Product.findOne({ _id: id })
			.populate("WebsiteID", ["Domain", "Icon"])
			.populate("CategoryID", ["Desc"]);

		console.log(product);

		if (!product) return handleResponse(res, 400, "Product is not existed!");
		res.send(product);
	} catch (error) {
		console.log(error);
		return handleResponse(res, 500);
	}
});


// @ DELETE api/product/all=true
// @Desc: Get Product by ID
// @access: Public
router.delete("/", async (req, res) => {
	let isAll = req.query.all;
	if (!isAll) return handleResponse(res, 400, "isAll need to be true");

	let isSuccess = await DeleteProduct();
	if (isSuccess)
		return handleResponse(res, 200, "Delete all Product is Successfully");
	else return handleResponse(res, 500);
})

async function DeleteProduct() {
	try {
		await models.Product.deleteMany({});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = { router, DeleteProduct };