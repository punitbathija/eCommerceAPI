const express = require("express");
const {
  productDummy,
  getAllProducts,
  addProduct,
  adminGetAllProducts,
  getSingleProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/dummyProduct").get(productDummy);

// User Routes
router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getSingleProduct);

// Admin Routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProducts);

module.exports = router;
