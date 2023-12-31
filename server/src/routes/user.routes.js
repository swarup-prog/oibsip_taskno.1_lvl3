const router = require("express").Router();

const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);

router.route("/updateUserInfo/:email").put(updateUserInfo);

module.exports = router;
