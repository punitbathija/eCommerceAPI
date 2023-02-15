const Product = require("../models/product");
const bigPromise = require("../middlewares/bigPromise");
const cloudinary = require("cloudinary");
const CustomError = require("../utils/customError");

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
    for (i = 0; i < req.files.photos.length; i++) {
      let result = await cloudinary.v2.uploader.upload(
        req.files.photos[i].tempPathFile,
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

  const product = Product.create(req.body);

  req.status(200).json({
    success: true,
    product,
  });
});
