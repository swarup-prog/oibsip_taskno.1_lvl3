const { Order } = require("../models/order/Order");
const { Inventory } = require("../models/inventory/Inventory");
const { Favourite } = require("../models/favourite/Favourite");

const placeOrder = async (req, res) => {
  let body = { ...req.body };

  try {
    if (body.favourite) {
      const { paymentId, favourite, ...favouriteOrder } = req.body;
      await new Favourite({ ...favouriteOrder }).save();
    }

    if (!body.status) body = { ...body, status: "Pending" };

    await new Order({ ...body }).save();

    await Promise.all(
      Object.keys(body).map(async (key) => {
        if (
          key !== "status" &&
          key !== "paymentId" &&
          key !== "total" &&
          key !== "user" &&
          key !== "pizzaName" &&
          key !== "favourite"
        ) {
          const inventoryItemId = body[key];
          await Inventory.findByIdAndUpdate(
            inventoryItemId,
            { $inc: { quantity: -1 } }, // Decrement the quantity by 1
            { new: true }
          );
        }
      })
    );

    res.status(201).send({ message: "Order placed successfully." });
  } catch (error) {
    console.log("Error in while adding ingredient", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

module.exports = { placeOrder };
