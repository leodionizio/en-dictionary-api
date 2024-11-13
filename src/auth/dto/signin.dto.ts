import { IsString, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class SigninResponseDto {
  readonly email: string;
  readonly token: string;
}
