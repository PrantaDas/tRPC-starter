import { Router } from "@trpc/server";
import { router } from ".";

export const routes: Router<any> = router({});

export type Routes = typeof routes;
