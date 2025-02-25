import cors from "cors";
import helmet from "helmet";

import { CONFIG } from "../config";
import { Middleware } from "../types";

export const combinedMiddleware: Middleware = (req, res, next) => {
  cors({
    origin: CONFIG.CORS_ORIGINS,
    credentials: true,
  })(req, res, () => {
    helmet()(req, res, () => {
      next();
    })
  })
};