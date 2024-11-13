import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signin(signinDto: SigninDto): Promise<SigninResponseDto> {
    const { email, password } = signinDto;

    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      email: user.email,
      token: this.jwtService.sign(payload),
    } as SigninResponseDto;
  }

  async signup(createUserDto: CreateUserDto): Promise<SignupResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    const payload = { email: user.email, sub: user.id };

    return {
      id: user.id,
      name: user.name,
      token: this.jwtService.sign(payload),
    } as SignupResponseDto;
  }
}
