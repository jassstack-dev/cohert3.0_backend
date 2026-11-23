
import mongoose from "mongoose";
import config from "./config.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error in DB connection:", error.message);
    throw error;
  }
};

export default connectToDb;
