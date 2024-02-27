import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as any);
  } catch (error) {
    console.log("Error: " + error);
  }
};
