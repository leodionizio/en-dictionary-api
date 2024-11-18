import { ApiProperty } from '@nestjs/swagger';

export class LicenseDto {
  @ApiProperty({
    example: 'CC BY-SA 3.0',
    description: 'Name',
  })
  readonly name: string;

  @ApiProperty({
    example: 'https://creativecommons.org/licenses/by-sa/3.0',
    description: 'Url',
  })
  readonly url: string;
}

export class PhoneticDto {
  @ApiProperty({
    example: '/ˈpɹɒmɪs/',
    description: 'Test',
  })
  readonly text: string;

  @ApiProperty({
    example:
      'https://api.dictionaryapi.dev/media/pronunciations/en/promise-us.mp3',
    description: 'Audio',
    required: false,
  })
  readonly audio?: string;

  @ApiProperty({
    example: '/ˈpɹɒmɪs/',
    description: 'Source url',
    required: false,
  })
  readonly sourceUrl?: string;

  @ApiProperty({
    example: {
      name: 'BY-SA 3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    description: 'License',
    required: false,
  })
  readonly license?: string;
}

export class DefinitionDto {
  @ApiProperty({
    example: 'An oath or affirmation; a vow',
    description: 'Definition',
  })
  readonly definition: string;

  @ApiProperty({
    example: 'if I make a promise, I always stick to it;  he broke his promise',
    description: 'Example',
    required: false,
  })
  readonly example?: string;

  @ApiProperty({
    example: ['promise'],
    description: 'Synonyms',
  })
  readonly synonyms: string[];

  @ApiProperty({
    example: ['promise'],
    description: 'Antonyms',
  })
  readonly antonyms: string[];
}

export class MeaningDto {
  @ApiProperty({
    example: 'noun',
    description: 'Meaning',
  })
  readonly partOfSpeech: string;

  @ApiProperty({
    example: 'To give grounds for expectation, especially of something good.',
    description: 'Definition',
  })
  readonly definitions: DefinitionDto[];
}

export class ExternalDictionaryResponseDto {
  @ApiProperty({
    example: 'promise',
    description: 'Word',
  })
  readonly word: string;

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
  origin?: string;

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
    example: 'promise',
    description: 'Word',
  })
  license: LicenseDto;

  @ApiProperty({
    example: 'promise',
    description: 'Word',
  })
  sourceUrls: string[];
}
