const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    status: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
