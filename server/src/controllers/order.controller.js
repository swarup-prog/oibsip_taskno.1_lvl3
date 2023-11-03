const { Order } = require("../models/order/Order");
const { Inventory } = require("../models/inventory/Inventory");
const { Favourite } = require("../models/favourite/Favourite");

const placeOrder = async (req, res) => {
  let body = { ...req.body };

  try {
    const userId = req.params.id;
    body = { ...body, user: userId };

    if (body.favourite) {
      const { paymentId, favourite, ...favouriteOrder } = req.body;
      await new Favourite({ ...favouriteOrder, user: userId }).save();
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

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const order = await Order.findOne({ user: userId });

    if (!order) {
      return res
        .status(404)
        .send({ message: "You haven't ordered anything yet." });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { placeOrder, getUserOrders };
