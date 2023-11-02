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
    console.log("Error in while adding ingredient", error);
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

const updateIngredient = async (req, res) => {
  try {
    const id = req.params.id;
    const body = { ...req.body };

    const ingredient = await Inventory.findById({ _id: id });

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found." });
    }

    // Update the ingredient document and save the changes
    ingredient.set({ ...body });
    const updatedIngredient = await ingredient.save();

    res.status(200).send({ message: "Ingredient updated successfully" });
  } catch (error) {
    console.error("Error updating ingredient details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addIngredient, getAllIngredients, updateIngredient };
