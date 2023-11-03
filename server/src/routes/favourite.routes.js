const router = require("express").Router();
const { getFavourites } = require("../controllers/favourite.controller.js");

router.route("/getFavourites/:id").get(getFavourites);

module.exports = router;
