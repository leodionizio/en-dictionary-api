import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { DictionaryModule } from './dictionary/dictionary.module';
import { Dictionary } from './dictionary/dictionary.entity';
import { HistoryModule } from './history/history.module';
import { History } from './history/history.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteModule } from './favorite/favorite.module';
import { Favorite } from './favorite/favorite.entity';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';
import { CacheMiddleware } from './middleware/cache.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Dictionary, History, Favorite],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    CacheModule,
    AuthModule,
    UserModule,
    DictionaryModule,
    HistoryModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheMiddleware).forRoutes('*');
  }
}
