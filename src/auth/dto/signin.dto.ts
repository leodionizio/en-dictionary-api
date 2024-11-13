import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'E-mail' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class SigninResponseDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'E-mail',
  })
  readonly email: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Authorization token',
  })
  readonly token: string;
}
