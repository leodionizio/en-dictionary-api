import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IsEmailUniqueConstraint } from '../common/validators/is-email-unique.validator';
import { AuthModule } from '../auth/auth.module';
import { HistoryModule } from '../history/history.module';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    HistoryModule,
    FavoriteModule,
  ],
  controllers: [UserController],
  providers: [UserService, IsEmailUniqueConstraint],
  exports: [UserService],
})
export class UserModule {}
