import { TRPCError } from "@trpc/server";
import { t } from "../trpc/trpc";
import { validApiKey } from "../utils/validApiKey";


export const withApiKey = t.middleware(async ({ ctx, next }) => {
  if (!validApiKey(ctx.req.headers?.["x-api-key"] as string)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid API key",
    })
  }
  return next();
});