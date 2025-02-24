import { initTRPC, TRPCError } from "@trpc/server";
import { t, TRPCReturnType } from "../trpc";
import { getUserFromToken } from "../utils/getUserFromToken";
import { parseCookies } from "../utils/parseCookie";

export const auth = (t: TRPCReturnType) =>
  t.middleware(async ({ ctx, next }) => {
    try {
      const token =
        ctx.req?.headers?.authorization?.replace("Bearer ", "") ||
        parseCookies(ctx.req?.headers["cookie"] || "")["some-cookie"];

      if (!token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No authentication token provided",
        });
      }

      const user = await getUserFromToken(token);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        });
      }

      return next({
        ctx: {
          ...ctx,
          user,
        },
      });
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Authentication failed",
      });
    }
  });
