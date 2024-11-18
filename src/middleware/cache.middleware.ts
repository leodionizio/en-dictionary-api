import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const cacheKey = this.generateCacheKey(req);

    const cachedResponse = await this.cacheService.get(cacheKey);
    if (cachedResponse) {
      res.setHeader('x-cache', 'HIT');
      res.setHeader('x-response-time', `${Date.now() - start}ms`);
      return res.send(JSON.parse(cachedResponse as any));
    }

    res.setHeader('x-cache', 'MISS');

    // res.on('finish', () => {
    //   res.setHeader('x-response-time', `${Date.now() - start}ms`);
    // });

    next();
  }

  private generateCacheKey(req: Request): string {
    if (req.method === 'GET') {
      return `cache:${req.originalUrl}`;
    }

    return `cache:${req.path}:${JSON.stringify(req.query)}`;
  }
}
