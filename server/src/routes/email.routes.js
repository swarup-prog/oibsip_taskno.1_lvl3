const sendEmail = require("../controllers/email.controller.js");
const router = require("express").Router();

router.route("/mail").post(sendEmail);

module.exports = router;
