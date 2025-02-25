import jwt from "jsonwebtoken";
import { IUser } from "../types";
import { CONFIG } from "../config";
import User from "../db/models/User";

export const getUserFromToken = async (token: string): Promise<IUser | null> => {
  try {
    if (token) {
      const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { id: string, email: string };
      const user = await User.findById(decoded.id);
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
