import express from "express";
import {
  getAllBooks,
  getBookDetails,
  getCategoryBooks,
} from "../controllers/bookController.js";
const router = express.Router();

router.get("/", getAllBooks);
router.get("/category/:category", getCategoryBooks);
router.get("/book/:book", getBookDetails);

export default router;
