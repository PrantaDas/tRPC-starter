import Redis from "ioredis";
import { CONFIG } from "../config";

class RedisCache {
  private static instance: RedisCache;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis({
      host: CONFIG.REDIS_HOST,
      port: CONFIG.REDIS_PORT,
    });
  }

  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  public async get(key: string): Promise<any> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  public async set(key: string, value: any, ttl: number = 60): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), "EX", ttl);
  }

  public async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  public async flush(): Promise<void> {
    await this.redis.flushall();
  }
}

export default RedisCache;
