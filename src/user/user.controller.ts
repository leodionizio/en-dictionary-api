import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() req) {
    const user = await this.userService.findUserById(req.user.sub);
    return plainToClass(User, user, { excludeExtraneousValues: true });
  }

  @Get('me/history')
  async getUserHistory(@Req() req) {
    return this.userService.findUserHistory(req.user.sub);
  }

  @Get('me/favorites')
  async getUserFavorites(@Req() req) {
    return this.userService.findUserFavorites(req.user.sub);
  }
}
