import {
  registerUser,
  loginUser,
  logoutUser,
  verifyMe,
} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/verify-user").get(verifyMe);

export default router;
