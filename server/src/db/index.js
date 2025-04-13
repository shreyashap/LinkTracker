import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

export default connectDB;
