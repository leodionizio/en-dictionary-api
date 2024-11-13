import { Dictionary } from '../../dictionary/dictionary.entity';

export class FavoriteWithDictionaryDto {
  id: string;
  createdAt: Date;
  dictionary: Dictionary;
}
