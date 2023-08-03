import express from "express";
import { doLogin, doSignup } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", doLogin);
router.post("/signup", doSignup);

export default router;
