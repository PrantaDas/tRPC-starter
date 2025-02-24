import { MiddlewareFunction, ProcedureParams } from "@trpc/server";
import RedisCache from "../cache/redis";

const redisCache = RedisCache.getInstance();

const generateCacheKey = (path: string, input: any) =>
  `trpc:${path}:${JSON.stringify(input)}`;

export const cache =
  <T extends ProcedureParams>(ttl: number = 60): MiddlewareFunction<T, T> =>
  async ({ path, input, next }) => {
    const cacheKey = generateCacheKey(path, input);

    const cachedData = await redisCache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const result = await next();

    await redisCache.set(cacheKey, result, ttl);

    return result;
  };
