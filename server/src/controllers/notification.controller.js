const { Notification } = require("../models/notification/Notification");

const getNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    const notification = await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });

    if (!notification) {
      return res
        .status(404)
        .send({ message: "You don't have any new new notifications." });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.error("Error retrieving notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getNotifications;
