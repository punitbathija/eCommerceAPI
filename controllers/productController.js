const Product = require("../models/product");
const bigPromise = require("../middlewares/bigPromise");
const cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");
const productFilter = require("../utils/productFilter");

exports.productDummy = async (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "this is a test route for products",
  });
};

exports.addProduct = bigPromise(async (req, res, next) => {
  let imageArray = [];

  if (!req.files) {
    return next(new CustomError("images are required", 401));
  }

  if (req.files) {
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products",
        }
      );

      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = bigPromise(async (req, res, next) => {
  const resultPerPage = 8;
  const countProduct = await Product.countDocuments();

  const productsObj = new productFilter(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base.clone();

  const filterProducts = products.length;

  productsObj.pager(resultPerPage);
  products = await productsObj.base;

  res.status(200).json({
    success: true,
    products,
    filterProducts,
    countProduct,
  });
});

exports.adminGetAllProducts = bigPromise(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    next(new CustomError("No products ffound in the inventory"));
  }

  res.status(200).json({
    success: true,
    products,
  });
});
