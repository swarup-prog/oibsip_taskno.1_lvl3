const router = require("express").Router();
const { createOrder } = require("../controllers/payment.controller.js");

router.route("/createOrder").post(createOrder);

module.exports = router;
