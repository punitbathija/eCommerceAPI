const express = require("express");
const { productDummy } = require("../controllers/productController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/dummyProduct").get(productDummy);

module.exports = router;
