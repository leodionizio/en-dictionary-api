import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redis: Redis | null;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async set<T>(data: T, key: string): Promise<void> {
    await this.redis.set(key, JSON.stringify(data), 'EX', 180);
  }

  async get<T>(key: string): Promise<T> {
    return JSON.parse(await this.redis.get(key)) as T;
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
