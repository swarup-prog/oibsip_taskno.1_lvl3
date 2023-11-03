const router = require("express").Router();
const {
  placeOrder,
  getUserOrders,
} = require("../controllers/order.controller.js");

router.route("/placeOrder/:id").post(placeOrder);
router.route("/getUserOrders/:id").get(getUserOrders);

module.exports = router;
