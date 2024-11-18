import { ApiProperty } from '@nestjs/swagger';

export class GetUserProfileDto {
  @ApiProperty({
    example: 'abb7c6b4-2a02-43c4-92e2-be7760424932',
    description: 'ID',
  })
  readonly id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Fullname',
  })
  readonly name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'E-mail',
  })
  readonly email: string;

  @ApiProperty({
    example: '2024-11-13 22:00:38.466',
    description: 'Created at',
  })
  readonly createdAt: Date;
}
