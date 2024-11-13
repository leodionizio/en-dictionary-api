export class PhoneticDto {
  text: string;
  audio?: string;
}

export class DefinitionDto {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export class MeaningDto {
  partOfSpeech: string;
  definitions: DefinitionDto[];
}

export class ExternalDictionaryResponseDto {
  word: string;
  phonetic?: string;
  phonetics: PhoneticDto[];
  origin?: string;
  meanings: MeaningDto[];
}
