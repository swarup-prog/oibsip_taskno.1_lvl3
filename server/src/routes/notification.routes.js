const getNotifications = require("../controllers/notification.controller.js");
const router = require("express").Router();

router.route("/getNotifications/:id").get(getNotifications);

module.exports = router;
