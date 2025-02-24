import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { t } from "../trpc/trpc";
import { getUserFromToken } from "../utils/getUserFromToken";
import { parseCookies } from "../utils/parseCookie";

export const auth = t.middleware(({ ctx, next, }) => {
  const token = ctx.req?.headers?.authorization?.replace("Bearer ", "") || parseCookies(ctx.req?.headers["cookie"])["some-cookie"]
  const user = getUserFromToken(token);
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No authentication token provided"
    });
  }

  return next({
    ctx: {
      ...ctx,
      user,
    }
  });
});
