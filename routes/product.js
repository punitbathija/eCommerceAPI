const express = require("express");
const {
  productDummy,
  getAllProducts,
  addProduct,
  adminGetAllProducts,
} = require("../controllers/productController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/dummyProduct").get(productDummy);

// User Routes
router.route("/products").get(getAllProducts);

// Admin Routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProducts);

module.exports = router;
