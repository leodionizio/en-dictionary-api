import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// import { IsEmailUnique } from '../../common/validators/is-email-unique.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  // @IsEmailUnique() // rever
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
