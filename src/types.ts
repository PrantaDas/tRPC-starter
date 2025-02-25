import http from "http";
import { Document, Model } from "mongoose";

export interface Meta {
  authRequired: boolean;
  role?: "user" | "admin";
}

export interface BaseContext {
  req: http.IncomingMessage;
  user?: IUser | null;
}

export interface IUser extends Model<Document> {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
