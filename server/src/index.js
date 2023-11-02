require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const fileUpload = require("express-fileupload");
const { Inventory } = require("./models/inventory/Inventory.js");

const AuthRoute = require("./routes/auth.routes.js");
const UserRoute = require("./routes/user.routes.js");
const PasswordRecoveryRoute = require("./routes/email.routes.js");
const InventoryRoute = require("./routes/inventory.routes.js");
const PaymentRoute = require("./routes/payment.routes.js");
const cron = require("node-cron");
const OrderRoute = require("./routes/order.routes.js");

connection();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/recovery", PasswordRecoveryRoute);
app.use("/api/inventory", InventoryRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/order", OrderRoute);

cron.schedule("0 * * * *", async () => {
  try {
    // Query the inventory for items with a quantity less than 20
    const lowQuantityItems = await Inventory.find({ quantity: { $lt: 20 } });

    if (lowQuantityItems.length > 0) {
      // Send a notification to the admin (you need to implement this logic)
      console.log("Low quantity items:", lowQuantityItems);
    }
  } catch (error) {
    console.error("Error checking inventory:", error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});
