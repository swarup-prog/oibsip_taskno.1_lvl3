import mongoose from "mongoose";

const connection = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database...");
  } catch (error) {
    console.log("Could not connect to database...", error);
  }
};

export default connection;
