import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT) || 6379,
        // password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
