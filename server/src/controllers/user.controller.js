const { User } = require("../models/user/User");
const bcrypt = require("bcrypt");

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, { password: 0, __v: 0 });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const body = { ...req.body };

    var hashedPassword = "";

    if (body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      hashedPassword = await bcrypt.hash(body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { ...body, password: hashedPassword },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json("updateUser");
  } catch (error) {
    console.error("Error upadting user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserInfo, updateUserInfo };
