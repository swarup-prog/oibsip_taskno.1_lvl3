const {
  getNotifications,
  deleteNotifications,
} = require("../controllers/notification.controller.js");
const router = require("express").Router();

router.route("/getNotifications/:id").get(getNotifications);
router.route("/delete/:id").delete(deleteNotifications);

module.exports = router;
