import http from "http";

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
