import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UserWordsAddedResponseDto } from './dto/user-words-added.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Get user profile sucessful',
    type: GetUserProfileDto,
  })
  async getMe(@Req() req) {
    const user = await this.userService.findUserById(req.user.sub);
    return plainToClass(User, user, { excludeExtraneousValues: true });
  }

  @Get('me/history')
  @ApiResponse({
    status: 200,
    description: 'Get word history sucessful',
    type: UserWordsAddedResponseDto,
  })
  async getUserHistory(@Req() req) {
    return this.userService.findUserHistory(req.user.sub);
  }

  @Get('me/favorites')
  @ApiResponse({
    status: 200,
    description: 'Get favorites word sucessful',
    type: UserWordsAddedResponseDto,
  })
  async getUserFavorites(@Req() req) {
    return this.userService.findUserFavorites(req.user.sub);
  }
}
