import { initTRPC } from '@trpc/server';
import { auth } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';
import { Context } from './context';

export interface Meta {
  authRequired: boolean;
  role?: "user" | "admin"
}

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false
    },
    isDev: process.env.NODE_ENV === "development",
  });

export const publicProcedure = t.procedure;

export type PublicProcedure = typeof publicProcedure;

export const adminProcedure = t.procedure.use(auth).use(checkRole);

export type AdminProcedure = typeof adminProcedure;

const privateProcedure = t.procedure.use(auth);

export type PrivateProcedure = typeof privateProcedure;