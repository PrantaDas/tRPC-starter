import { User } from "../types";

export const getUserFromToken = (token: string): User | null => {
  try {
    if (token) {
      return {
        id: "1",
        role: "admin",
      };
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
