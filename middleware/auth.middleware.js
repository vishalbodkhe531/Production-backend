import { User } from "../models/user.models.js";
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(errorHandler(400, "You should login first"));
  }
  const data = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById({ _id: data._id });
  next();
};
