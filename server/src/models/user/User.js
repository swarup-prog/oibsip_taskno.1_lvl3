import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation error: " + error.message);
  }
};

const User = mongoose.model("User", userSchema);

export { User };
