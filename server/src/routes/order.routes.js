const router = require("express").Router();
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller.js");

router.route("/placeOrder/:id").post(placeOrder);
router.route("/getUserOrders/:id").get(getUserOrders);
router.route("/getAllOrders").get(getAllOrders);
router.route("/updateOrderStatus/:id").put(updateOrderStatus);

module.exports = router;
