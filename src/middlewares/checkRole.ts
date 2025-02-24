import { TRPCError } from "@trpc/server";
import { t } from "../trpc/trpc";

export const checkRole = t.middleware(({ ctx, next }) => {
  if (!ctx.user?.role || ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have the required admin role"
    });
  }
  return next();
});