import { initTRPC } from "@trpc/server";
import { EventEmitter } from "events";
import { auth } from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { Context } from "./context";
import { Meta } from "../types";
import { CONFIG } from "../config";
import { errorHanlder } from "../middlewares/errorHandler";

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false,
    },
    isDev: CONFIG.IS_DEV_MODE,
  });

export const router = t.router;

export const publicProcedure = t.procedure.use(errorHanlder(t));

export const adminProcedure = t.procedure
  .use(auth(t))
  .use(checkRole(t))
  .use(errorHanlder(t));

export const privateProcedure = t.procedure.use(auth(t)).use(errorHanlder(t));

export const eventEmitter = new EventEmitter();

export type TRPCReturnType = typeof t;

export type PublicProcedure = typeof publicProcedure;

export type AdminProcedure = typeof adminProcedure;

export type PrivateProcedure = typeof privateProcedure;

export type AppRouter = typeof router;
