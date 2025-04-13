import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    const user = await User.findById(decodedToken?._id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access token",
    });
  }
});

export default verifyJWT;
