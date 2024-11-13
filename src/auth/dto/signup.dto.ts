import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty({
    example: 'b778fa54-da66-45cd-bae5-8e77e2a66e8d',
    description: 'User ID',
  })
  readonly id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Fullname',
  })
  readonly name: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Authorization Token',
  })
  readonly token: string;
}
