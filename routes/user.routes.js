import express from "express";
import {
  createUser,
  getProfile,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/new", createUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getProfile);
router.post("/logout", logoutUser);
export default router;
