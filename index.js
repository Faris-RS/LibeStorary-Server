import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connection from "./config/dbConnection.js";
import authRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import cartRouter from "./routes/cart.js";

const app = express();
dotenv.config();
connection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/user", authRouter);
app.use("/book", bookRouter);
app.use("/cart", cartRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
