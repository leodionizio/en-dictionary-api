import { ApiProperty } from '@nestjs/swagger';
import { WordAdded } from '../../common/interfaces/word-added-info';

export class UserWordsAddedResponseDto {
  @ApiProperty({
    example: [{ word: 'single', added: '2024-11-13 22:00:38.466' }],

    description: 'List of words',
  })
  results: WordAdded[];
}
