const router = require("express").Router();
const { placeOrder } = require("../controllers/order.controller.js");

router.route("/placeOrder/:id").post(placeOrder);

module.exports = router;
