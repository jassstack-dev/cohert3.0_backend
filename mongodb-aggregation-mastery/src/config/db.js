
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const db = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    throw error;
  }
};

export default db;
