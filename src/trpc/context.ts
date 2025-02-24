import { inferAsyncReturnType } from "@trpc/server";
import http from "http";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";

export interface User {
  id: string;
  role: "admin" | "user";
}

export interface BaseContext {
  req: http.IncomingMessage;
  res: http.ServerResponse;
  user?: User | null;
}

export const createContext = (opts: CreateHTTPContextOptions | CreateWSSContextFnOptions): BaseContext => {
  return {
    req: opts.req,
    res: opts.res,
    user: null
  }
};


export type Context = inferAsyncReturnType<typeof createContext>;