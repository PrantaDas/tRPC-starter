import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const errorHanlder = t.middleware(({ next }) => {
  try {
    return next();
  } catch (err: any) {
    throw new TRPCError({
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "An unexpected error occurred",
    });
  }
});
