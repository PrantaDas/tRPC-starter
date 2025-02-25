import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { WebSocketServer } from "ws";
import { routes } from "./trpc/routes";
import { createContext } from "./trpc/context";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { connectDB } from "./db/db";
import { logger } from "./utils/logger";
import { CONFIG } from "./config";
import { combinedMiddleware } from "./middlewares/combinedMiddleware";

export const app = async () => {
  const server = createHTTPServer({
    router: routes,
    createContext,
    middleware: combinedMiddleware
  });

  const wss = new WebSocketServer({ server: server.server });
  applyWSSHandler({
    wss,
    router: routes,
    createContext,
  });

  await connectDB();

  const startServer = async () => {
    try {
      server.listen(CONFIG.PORT);
      logger.info(`Server started on port ${CONFIG.PORT}`);
    } catch (err) {
      logger.error(err);
    }
  };

  return { startServer };
};
