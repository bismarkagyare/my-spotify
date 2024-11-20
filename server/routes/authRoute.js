import express from "express";
import { login, callback, refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", login);
router.get("/callback", callback);
router.post("/refresh_token", refreshToken);

export default router;
