import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from './dictionary.entity';
import { HistoryModule } from '../history/history.module';
import { UserModule } from '../user/user.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Dictionary]),
    HistoryModule,
    UserModule,
    FavoriteModule,
    HttpModule,
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
