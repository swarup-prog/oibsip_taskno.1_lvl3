const router = require("express").Router();
const {
  addIngredient,
  getAllIngredients,
  updateIngredient,
} = require("../controllers/inventory.controller.js");

router.route("/addIngredient").post(addIngredient);
router.route("/getAllIngredients").get(getAllIngredients);
router.route("/updateIngredient").post(updateIngredient);

module.exports = router;
