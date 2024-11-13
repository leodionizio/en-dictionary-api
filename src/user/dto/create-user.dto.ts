import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// import { IsEmailUnique } from '../../common/validators/is-email-unique.validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Fullname',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'E-mail' })
  @IsEmail()
  @IsNotEmpty()
  // @IsEmailUnique() // rever
  email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
