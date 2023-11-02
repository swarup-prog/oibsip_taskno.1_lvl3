const router = require("express").Router();
const { createOrder } = require("../controllers/payment.controller.js");

router.route("/createOrder/:id").post(createOrder);

module.exports = router;
