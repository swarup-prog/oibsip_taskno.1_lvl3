const { User, validate } = require("../models/user/User.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  let body = { ...req.body };

  try {
    // Validate the user input
    const { error } = validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Giving default role: user
    if (!body.role) body = { ...body, role: "user" };

    // Checking if user already exists
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).send({ message: "User already registered." });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Send the data to database
    await new User({
      ...body,
      password: hashedPassword,
    }).save();
    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    console.log("Error in registration", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password." });
    }

    const token = user.generateAuthToken();
    res
      .cookie("session-token", token, {
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token, message: "Login successful." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error." });
  }
};

const logout = async (req, res) => {};

module.exports = { register, login, logout };
