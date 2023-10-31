const { Inventory } = require("../models/inventory/Inventory");

const addIngredient = async (req, res) => {
  let body = { ...req.body };

  try {
    const ingredient = await Inventory.findOne({ name: body.name });
    if (ingredient) {
      return res.status(409).json({ message: "Ingredient already exists" });
    }
    await new Inventory({ ...body }).save();
    res.status(201).send({ message: "Ingredient added successfully." });
  } catch (error) {
    console.log("Error in registration", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Inventory.find();

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error retrieving ingredients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addIngredient, getAllIngredients };
