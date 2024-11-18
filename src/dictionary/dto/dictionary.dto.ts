import { ApiProperty } from '@nestjs/swagger';
import { LicenseDto, MeaningDto, PhoneticDto } from './external-dictionary.dto';

export class DictionaryResponseDto {
  @ApiProperty({
    example: 'abb7c6b4-2a02-43c4-92e2-be7760424932',
    description: 'ID',
  })
  readonly id: string;

  @ApiProperty({
    example: 'promise',
    description: 'Word',
  })
  readonly word: string;

  @ApiProperty({
    example: '2024-11-13 22:00:38.466',
    description: 'Created at',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '/ˈpɹɒmɪs/',
    description: 'Phonetic',
    required: false,
  })
  readonly phonetic?: string;

  @ApiProperty({
    example: [
      {
        text: '/ˈpɹɒmɪs/',
        audio: '',
      },
      {
        text: '/ˈpɹɑmɪs/',
        audio:
          'https://api.dictionaryapi.dev/media/pronunciations/en/promise-us.mp3',
        sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=1229319',
        license: {
          name: 'BY-SA 3.0',
          url: 'https://creativecommons.org/licenses/by-sa/3.0',
        },
      },
    ],
    description: 'Phonetics',
  })
  readonly phonetics: PhoneticDto[];

  @ApiProperty({
    example: 'Origin text description',
    description: 'Origin',
    required: false,
  })
  readonly origin?: string;

  @ApiProperty({
    example: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: 'An oath or affirmation; a vow',
            synonyms: [],
            antonyms: [],
            example:
              'if I make a promise, I always stick to it;  he broke his promise',
          },
        ],
      },
    ],
    description: 'Meanings',
  })
  readonly meanings: MeaningDto[];

  @ApiProperty({
    example: {
      name: 'CC BY-SA 3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    description: 'License',
  })
  readonly license: LicenseDto;

  @ApiProperty({
    example: ['https://en.wiktionary.org/wiki/promise'],
    description: 'Source urls',
  })
  sourceUrls: string[];
}

export class PaginatedDictionaryResponseDto {
  @ApiProperty({
    example: ['test, testing, tested'],
    description: 'Results',
  })
  readonly results: string[];

  @ApiProperty({
    example: 1200,
    description: 'Total of registers',
  })
  readonly totalDocs: number;

  @ApiProperty({
    example: '0d379680-9366-4269-b8e2-0056a87aee4a',
    description: 'Previous ID',
  })
  readonly previous: string;

  @ApiProperty({
    example: '0d379680-9366-4269-b8e2-0056a87aee4a',
    description: 'Next ID',
  })
  readonly next: string;

  @ApiProperty({
    example: true,
    description: 'Has next register',
  })
  readonly hasNext: boolean;

  @ApiProperty({
    example: false,
    description: 'Has previous register',
  })
  hasPrev: boolean;
}
