import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ip: String,
  userAgent: String,
  device: String,
  browser: String,
  os: String,
});

export default mongoose.model("Click", clickSchema);
