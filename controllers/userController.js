import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateJWT.js";

export const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = generateToken({ userId: user._id });
          const response = {
            token,
            message: "login successfull",
          };
          res.status(200).json(response);
        } else {
          res
            .status(201)
            .json({ message: "Incorrect password. Please try again." });
        }
      });
    } else {
      res
        .status(201)
        .json({ message: "No user found with the provided email." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const doSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      res.status(201).json({ message: "User already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ message: "User created successfully." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
