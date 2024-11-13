import { MeaningDto, PhoneticDto } from './external-dictionary.dto';

export class DictionaryResponseDto {
  id: string;
  word: string;
  createdAt: Date;
  phonetic?: string;
  phonetics: PhoneticDto[];
  origin?: string;
  meanings: MeaningDto[];
}
