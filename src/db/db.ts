import mongoose, { set } from "mongoose";
import { logger } from "../utils/logger";
import { CONFIG } from "../config";

set("allowDiskUse", true);
set("strictPopulate", true);

export const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URL);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
