import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: String,
  alias: String,
  clickCount: {
    type: Number,
    default: 0,
  },
  expirationDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Link", linkSchema);
