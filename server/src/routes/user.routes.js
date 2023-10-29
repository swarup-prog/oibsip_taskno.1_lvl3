const router = require("express").Router();

const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);

router.route("/updateUserInfo/:id").put(updateUserInfo);

module.exports = router;
