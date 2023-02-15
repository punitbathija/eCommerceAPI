const Product = require("../models/product");
const bigPromise = require("../middlewares/bigPromise");

exports.productDummy = async (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "this is a test route for products",
  });
};
