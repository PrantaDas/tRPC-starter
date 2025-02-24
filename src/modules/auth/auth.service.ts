import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../db/models/User";
import { DbOperations } from "../../db/operations";
import { AppError } from "../../errors/appError";
import { successResponse } from "../../utils/response";
import { CONFIG } from "../../config";

export class AuthService {
  static async register(input: {
    name: string;
    email: string;
    password: string;
  }) {
    if (!input || Object.keys(input).length === 0) {
      throw new AppError("Request Body is Empty", 400);
    }
    const isEmailTaken = await this.isEmailALreadyTaken(input.email);
    if (isEmailTaken) {
      throw new AppError("Email already taken", 409);
    }
    const user = new User(input);
    await user.save();
    return successResponse(user, "User Created");
  }

  static async login(input: { email: string; password: string }) {
    if (!input || Object.keys(input).length === 0) {
      throw new AppError("Request Body is Empty", 400);
    }

    const user = await DbOperations.findOne({
      table: User,
      key: { email: input.email },
    });
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = this.generateAccessToken(user.email, user._id);
    return successResponse({ token, user }, "User Logged In");
  }

  static async isEmailALreadyTaken(email: string): Promise<boolean> {
    const ixExist = await DbOperations.findOne({ table: User, key: { email } });
    return !!ixExist;
  }

  static generateAccessToken(email: string, id: string): string {
    return jwt.sign({ email, id }, CONFIG.JWT_SECRET);
  }
}
