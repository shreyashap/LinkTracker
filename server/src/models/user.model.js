import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
