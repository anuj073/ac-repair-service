import Redis from 'ioredis';
import { config } from './index';

const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  lazyConnect: true,
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

export const getCache = async (key: string): Promise<string | null> => {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

export const setCache = async (
  key: string,
  value: string,
  ttl: number = 300
): Promise<void> => {
  try {
    await redis.setex(key, ttl, value);
  } catch {
    // Fail silently
  }
};

export const deleteCache = async (pattern: string): Promise<void> => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    // Fail silently
  }
};

export default redis;