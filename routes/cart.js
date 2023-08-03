import express from "express";
import {
  addToCart,
  decrement,
  increment,
  isAlreadyInCart,
  removeFromCart,
  viewCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, viewCart);
router.get("/checkCart/:book", authMiddleware, isAlreadyInCart);
router.put("/addToCart", authMiddleware, addToCart);
router.patch("/increment", authMiddleware, increment);
router.patch("/decrement", authMiddleware, decrement);
router.delete("/delete/:book", authMiddleware, removeFromCart);

export default router;
