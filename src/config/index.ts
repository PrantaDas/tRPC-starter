import { config } from "dotenv";
config();

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  MONGO_URL: process.env.MONGO_URL!,
  COOKE_KEY: process.env.COOKE_KEY!,
  X_API_KEY: process.env.X_API_KEY!,
  JWT_SECRET: process.env.JWT_SECRET!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: process.env.REDIS_PORT!,
};
