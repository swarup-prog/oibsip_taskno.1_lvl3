const router = require("express").Router();
const {
  addIngredient,
  getAllIngredients,
} = require("../controllers/inventory.controller.js");

router.route("/addIngredient").post(addIngredient);
router.route("/getAllIngredients").get(getAllIngredients);

module.exports = router;
