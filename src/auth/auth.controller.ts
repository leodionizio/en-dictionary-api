import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'Signin successful',
    type: SigninResponseDto,
  })
  async signin(@Body() signinDto: SigninDto) {
    return await this.authService.signin(signinDto);
  }

  @Post('signup')
  @ApiResponse({
    status: 200,
    description: 'User signup successful',
    type: SignupResponseDto,
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
}
