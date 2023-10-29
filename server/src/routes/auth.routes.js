const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller.js");

// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

// Logout route

module.exports = router;
