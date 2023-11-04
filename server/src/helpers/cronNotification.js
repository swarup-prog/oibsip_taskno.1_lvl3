const cron = require("node-cron");
const { Inventory } = require("../models/inventory/Inventory.js");
const { User } = require("../models/user/User.js");
const { Notification } = require("../models/notification/Notification.js");

const checkLowQuantityItems = async () => {
  try {
    const lowQuantityItems = await Inventory.find({ quantity: { $lt: 20 } });

    if (lowQuantityItems.length > 0) {
      const adminUsers = await User.find({ role: "admin" });

      if (adminUsers.length > 0) {
        adminUsers.forEach(async (adminUser) => {
          const notification = new Notification({
            recipient: adminUser._id,
            title: "Low Quantity Alert",
            message: "Low quantity items have been detected in the inventory.",
            type: "low-quantity",
          });
          await notification.save();
          console.log("Notification sent");
        });
      }
    }
  } catch (error) {
    console.error("Error checking inventory:", error);
  }
};

module.exports = cron.schedule("0 * * * *", checkLowQuantityItems);
