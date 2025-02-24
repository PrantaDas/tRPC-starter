import http from "http";
import { Document, Model } from "mongoose";

export interface Meta {
  authRequired: boolean;
  role?: "user" | "admin";
}

export interface User {
  id: string;
  role: "admin" | "user";
}

export interface BaseContext {
  req: http.IncomingMessage;
  user?: User | null;
}

export interface IUser extends Model<Document> {
  name: string;
  email: string;
  password: string;
}
