import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.userService.findUserById(req.user.id);
    return plainToClass(User, user, { excludeExtraneousValues: true });
  }

  @Get('me/history')
  async getUserHistory(@Request() req) {
    const userId = req.user.id;
    return this.userService.findUserHistory(userId);
  }

  @Get('me/favorites')
  async getUserFavorites(@Request() req) {
    const userId = req.user.id;
    return this.userService.findUserFavorites(userId);
  }
}
