import express from "express";
import { redirectAndLog } from "../controllers/link.controller.js";

const router = express.Router();

router.route("/:shortCode").get(redirectAndLog);

export default router;
