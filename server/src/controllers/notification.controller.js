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

const deleteNotifications = async (req, res) => {
  try {
    const userId = req.params.id;
    await Notification.deleteMany({ recipient: userId });

    return res
      .status(200)
      .json({ message: "All notifications deleted successfully." });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getNotifications, deleteNotifications };
