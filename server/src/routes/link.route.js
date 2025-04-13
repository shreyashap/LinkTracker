import express from "express";
import verifyJwt from "../middlewares/authMiddleware.js";
import {
  createShortLink,
  getUserLinks,
  redirectAndLog,
  getLinkAnalytics,
  deleteLink,
  searchLinks,
} from "../controllers/link.controller.js";

const router = express.Router();

router.post("/create", verifyJwt, createShortLink);
router.get("/user/", verifyJwt, getUserLinks);
router.get("/:id/analytics", verifyJwt, getLinkAnalytics);
router.delete("/:id", verifyJwt, deleteLink);
router.get("/link-search/", searchLinks);

export default router;
