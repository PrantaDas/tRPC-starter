import { observable } from "@trpc/server/observable";
import { eventEmitter, publicProcedure, router } from "../../trpc";
import { loginSchema, registerSchema } from "../../validations/auth";
import { AuthService } from "./auth.service";
import { IUser } from "../../types";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const response = await AuthService.register(input);
      eventEmitter.emit("user-registered", response.data);
      return response;
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const response = await AuthService.login(input);
    return response;
  }),
  onUserRegister: publicProcedure.subscription(() =>
    observable<IUser>((emit) => {
      const pub = (user: IUser) => emit.next(user);
      eventEmitter.on("user-registered", pub);
      return () => eventEmitter.off("user-registered", pub);
    })
  ),
});
