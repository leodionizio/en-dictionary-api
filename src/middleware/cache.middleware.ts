import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // Aqui, geramos a chave de cache de forma mais específica
    // O que inclui parâmetros de consulta ou dados no corpo, se necessário
    const cacheKey = this.generateCacheKey(req);

    // Tentar obter a resposta do cache
    const cachedResponse = await this.cacheService.get(cacheKey);
    if (cachedResponse) {
      res.setHeader('x-cache', 'HIT');
      res.setHeader('x-response-time', `${Date.now() - start}ms`);
      return res.send(JSON.parse(cachedResponse as any)); // Resposta do cache
    }

    // Caso não haja cache, marque como MISS
    res.setHeader('x-cache', 'MISS');

    // Defina o tempo de resposta após o término da requisição
    // res.on('finish', () => {
    //   res.setHeader('x-response-time', `${Date.now() - start}ms`);
    // });

    // Chama o próximo middleware ou a rota para processar a resposta
    next();
  }

  private generateCacheKey(req: Request): string {
    // Aqui, você pode gerar a chave de cache da forma que quiser
    // Incluindo partes da URL, parâmetros de consulta e dados do corpo
    if (req.method === 'GET') {
      return `cache:${req.originalUrl}`;
    }

    // Se for outro tipo de requisição, como POST, você pode customizar mais
    // Por exemplo, combinar URL com parâmetros de corpo ou consulta
    // Exemplo: cache:dictionary:findAll?limit=10&cursor=20
    return `cache:${req.path}:${JSON.stringify(req.query)}`;
  }
}
