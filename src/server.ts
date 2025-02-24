import { app } from "./app";
import { logger } from "./utils/logger";

(async () => {
  logger.info("Staring server");
  (await app()).startServer();
})();
