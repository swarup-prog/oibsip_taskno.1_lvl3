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
    const email = req.params.email;
    const body = { ...req.body };

    let hashedPassword = "";

    if (body.newPassword) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      hashedPassword = await bcrypt.hash(body.newPassword, salt);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user document and save the changes
    user.set({ ...body, password: hashedPassword });
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserInfo, updateUserInfo };
