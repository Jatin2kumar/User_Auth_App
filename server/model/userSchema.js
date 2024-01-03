import mongoose from "mongoose";

const userschema = mongoose.Schema({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
    minlenght: [3, "fullname must be 3 letters long"],
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: String,
});

export default mongoose.model("user", userschema);
