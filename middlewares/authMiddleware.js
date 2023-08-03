import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      let token = authHeader.split(" ")[1];
      token = token.replace(/['"]+/g, "");

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(201)
            .json({
              status: 400,
              message: "Please login to perform this action",
            });
        } else {
          const user = await userModel.findOne({ _id: result.userId });
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error in authMiddleware");
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}

export default authMiddleware;
