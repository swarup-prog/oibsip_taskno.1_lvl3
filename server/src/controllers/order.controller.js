const { Order } = require("../models/order/Order");
const { Inventory } = require("../models/inventory/Inventory");
const { Favourite } = require("../models/favourite/Favourite");
const { Notification } = require("../models/notification/Notification.js");
const { User } = require("../models/user/User.js");

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

    const notification = new Notification({
      recipient: userId,
      title: `Order Placed`,
      message: `Your order has been placed.`,
      type: `order-placed`,
    });
    await notification.save();

    const adminUsers = await User.find({ role: "admin" });

    if (adminUsers.length > 0) {
      adminUsers.forEach(async (adminUser) => {
        const notification = new Notification({
          recipient: adminUser._id,
          title: "New Order",
          message: "There is a new order from customers.",
          type: "order-placed",
        });
        await notification.save();
        console.log("Notification sent");
      });
    }

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
    console.log("Error in while placing order", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const order = await Order.find({ user: userId }, { __v: 0 })
      .sort({
        createdAt: -1,
      })
      .populate("pizzaBase", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("cheese", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("sauce", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("veggies", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("meat", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("user", { password: 0, role: 0, __v: 0 });

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

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({}, { __v: 0 })
      .sort({
        createdAt: -1,
      })
      .populate("pizzaBase", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("cheese", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("sauce", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("veggies", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("meat", { description: 0, quantity: 0, type: 0, __v: 0 })
      .populate("user", { password: 0, role: 0, __v: 0 });

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

const updateOrderStatus = async (req, res) => {
  const body = { ...req.body };

  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ message: "No such order found!" });
    }
    order.set({ ...order, status: body.status });
    await order.save();

    const notification = new Notification({
      recipient: order.user,
      title: `Order ${body.status}`,
      message: `Your order ${
        body.status === "Processing"
          ? "is being processed."
          : "has been sent for delivery."
      }`,
      type: `${
        body.status === "Processing" ? "order-processing" : "order-delivered"
      }`,
    });
    await notification.save();

    res.status(200).send({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
