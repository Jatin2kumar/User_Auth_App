import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI, {
      autoIndex: true,
    });
    console.log("Successfully connected to the Database.");
  } catch (error) {
    console.error("Error connecting to the database, ", error);
  }
};

export default connectDB;
