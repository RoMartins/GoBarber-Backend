import Redis, { Redis as redisClient } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: redisClient;

  constructor() {
    this.client = new Redis();
  }

  save(key: string, value: string): Promise<void> {}

  recover(key: string): Promise<void> {}

  invalidate(key: string): Promise<void> {}
}
