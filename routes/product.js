const express = require("express");
const {
  productDummy,
  getAllProducts,
  addProduct,
  adminGetAllProducts,
  getSingleProduct,
  adminMdoifyProduct,
  adminDeleteProduct,
  addReview,
  deleteReview,
  getReviewForSingleProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/dummyProduct").get(productDummy);

// User Routes
router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isLoggedIn, addReview);

router.route("/review").delete(isLoggedIn, deleteReview);

router.route("/reviews").get(isLoggedIn, getReviewForSingleProduct);

// Admin Routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

router
  .route("/admin/products")
  .get(isLoggedIn, customRole("admin"), adminGetAllProducts);

router
  .route("/admin/modify/product/:id")
  .post(isLoggedIn, customRole("admin"), adminMdoifyProduct);

router
  .route("/admin/delete/product/:id")
  .delete(isLoggedIn, customRole("admin"), adminDeleteProduct);
module.exports = router;
