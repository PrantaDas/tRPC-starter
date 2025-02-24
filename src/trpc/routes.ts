import { Router } from "@trpc/server";
import { router } from ".";
import { authRouter } from "../modules/auth/auth.router";

export const routes: Router<any> = router({
  auth: authRouter,
});

export type Routes = typeof routes;
