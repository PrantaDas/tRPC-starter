import { inferAsyncReturnType } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { BaseContext } from "../types";

export const createContext = (
  opts: CreateHTTPContextOptions | CreateWSSContextFnOptions
): BaseContext => {
  return {
    req: opts.req,
    user: null,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
