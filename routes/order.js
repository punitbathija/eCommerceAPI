const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getLoggedinUserOrders,
  adminGetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getSingleOrder);
router.route("/myorders").get(isLoggedIn, getLoggedinUserOrders);

// Admin Routes
router
  .route("/allorders")
  .get(isLoggedIn, customRole("admin"), adminGetAllOrders);

router
  .route("/markorder/order/:id")
  .post(isLoggedIn, customRole("admin"), adminUpdateOrder);

router
  .route("/delete/order/:id")
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
