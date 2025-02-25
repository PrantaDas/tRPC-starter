import { Router } from "@trpc/server";
import { publicProcedure, router } from ".";
import { authRouter } from "../modules/auth/auth.router";

export const routes: Router<any> = router({
  auth: authRouter,
  hello: publicProcedure.mutation(() => {
    return `Hello, From tRPC server!`;
  })
});

export type Routes = typeof routes;
