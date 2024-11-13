import { Dictionary } from '../../dictionary/dictionary.entity';

export class HistoryWithDictionaryDto {
  id: string;
  createdAt: Date;
  dictionary: Dictionary;
}
