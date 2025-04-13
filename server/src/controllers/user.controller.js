import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashPassword, isPasswordCorrect } from "../utils/hashPassword.js";
import { generateAccessToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const userExist = await User.findOne({ email }).lean();
  if (userExist) {
    return res
      .status(401)
      .json({ success: false, error: "User is already registered" });
  }

  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return res.status(500).json({ success: false, error: "Server error" });
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const user = await User.findById(newUser._id).select(
    "-password -accessToken"
  );

  if (!user) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to register" });
  }
  await user.save();

  res.status(200).json({
    message: "User registeration successfull",
    user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User is not registered" });
  }

  const isPassCorrect = await isPasswordCorrect(password, user.password);

  if (!isPassCorrect) {
    return res.status(404).json({ error: "Invalid credentials" });
  }

  const accessToken = await generateAccessToken(user._id);

  if (!accessToken) {
    return res.status(500).json({ error: "Error in generating accessToken" });
  }

  user.accessToken = accessToken;
  await user.save({ validateBeforeSave: false });
  const loggedInUser = await User.findById(user._id).select("-password");

  res.status(200).cookie("accessToken", accessToken, options).json({
    message: "User logged In successfully",
    loggedInUser,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        accessToken: "",
      },
    },
    {
      new: true,
    }
  );

  res.status(200).clearCookie("accessToken", options).json({
    message: "Logout successfull",
  });
});

const verifyMe = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(400).json({
      valid: false,
      message: "token is required",
    });
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken || !decodedToken._id) {
    return res.status(401).json({
      valid: false,
      message: "Invalid Token",
    });
  }

  const user = await User.findById(decodedToken?._id)
    .lean()
    .select("-password");

  if (!user) {
    return res.status(401).json({
      valid: false,
      message: "Unauthorized user",
    });
  }

  res.status(200).json({
    valid: true,
    message: "Successfull",
  });
});

export { registerUser, loginUser, logoutUser, verifyMe };
