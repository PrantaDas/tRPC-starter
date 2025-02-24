import { initTRPC } from "@trpc/server";
import { auth } from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { Context } from "./context";
import { Meta } from "../types";

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false,
    },
    isDev: process.env.NODE_ENV === "development",
  });

export const router = t.router;

export const publicProcedure = t.procedure;

export const adminProcedure = t.procedure.use(auth(t)).use(checkRole(t));

export const privateProcedure = t.procedure.use(auth(t));

export type TRPCReturnType = typeof t;

export type PublicProcedure = typeof publicProcedure;

export type AdminProcedure = typeof adminProcedure;

export type PrivateProcedure = typeof privateProcedure;

export type AppRouter = typeof router;
