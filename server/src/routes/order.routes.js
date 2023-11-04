const router = require("express").Router();
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
} = require("../controllers/order.controller.js");

router.route("/placeOrder/:id").post(placeOrder);
router.route("/getUserOrders/:id").get(getUserOrders);
router.route("/getAllOrders").get(getAllOrders);

module.exports = router;
