const router = require("express").Router();
const { addIngredient } = require("../controllers/inventory.controller.js");

router.route("/addIngredient").post(addIngredient);

module.exports = router;
