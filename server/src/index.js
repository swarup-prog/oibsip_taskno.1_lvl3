import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connection from "./database/connect.js";

dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});
