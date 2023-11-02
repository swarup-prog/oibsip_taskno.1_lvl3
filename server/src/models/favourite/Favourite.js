const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pizzaName: {
    type: String,
    required: true,
  },
  pizzaBase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  cheese: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  sauce: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  veggies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  meat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
  },
  total: {
    type: Number,
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = { Favourite };
