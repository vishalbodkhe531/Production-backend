import { User } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return next(errorHandler(400, "user already existed"));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const isPasswordMatch = bcryptjs.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return next(errorHandler(400, "Incorrect password"));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .status(202)
      .json({
        message: `Welcome ,${user.name}`,
      });
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req, res, next) => {
  const { user } = req;
  const { password, ...rest } = user._doc;
  res.status(200).json(rest);
};

export const logoutUser = (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "User logout successfully" });
  } catch (error) {
    next(error);
  }
};
