import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repository, MoreThan, LessThan, FindManyOptions } from 'typeorm';
import { Dictionary } from './dictionary.entity';
import {
  CursorPagination,
  PaginationParams,
} from '../common/interfaces/cursor-pagination';
import { ExternalDictionaryResponseDto } from './dto/external-dictionary.dto';
import { HistoryService } from '../history/history.service';
import { UserService } from '../user/user.service';
import { FavoriteService } from '../favorite/favorite.service';
import { CacheService } from '../cache/cache.service';

const externalDicionaryApiUrl =
  'https://api.dictionaryapi.dev/api/v2/entries/en/';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
    private readonly historyService: HistoryService,
    private readonly favoriteService: FavoriteService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async bulkInsert(words: string[]) {
    const batchSize = 1000;
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize);
      const wordEntities = batch.map((word) => {
        const dictionary = new Dictionary();
        dictionary.word = word;
        return dictionary;
      });
      await this.dictionaryRepository.save(wordEntities);
      console.log(`Batch ${i / batchSize + 1} inserted successfully.`);
    }
  }

  async getCount(condition?: FindManyOptions<Dictionary>) {
    return await this.dictionaryRepository.count(condition);
  }

  async findWordFromExternalApi(
    word: string,
  ): Promise<ExternalDictionaryResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ExternalDictionaryResponseDto[]>(
          `${externalDicionaryApiUrl}${word}`,
        ),
      );
      const [wordDetails] = response.data;

      return wordDetails;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(
        `Word ${word} not found in the external dictionary API`,
      );
    }
  }

  async findAll({
    limit,
    cursor,
    direction = 'next',
  }: PaginationParams): Promise<CursorPagination<string[]>> {
    const cacheKey = `dictionary:findAll:${limit}:${cursor || 'null'}:${direction}`;
    let cachedResult =
      await this.cacheService.get<CursorPagination<string[]>>(cacheKey);

    if (!cachedResult) {
      let whereCondition = {};

      if (cursor) {
        whereCondition =
          direction === 'next'
            ? { id: MoreThan(cursor) }
            : { id: LessThan(cursor) };
      }

      const results = await this.dictionaryRepository.find({
        where: whereCondition,
        take: limit,
        order: { word: direction === 'next' ? 'ASC' : 'DESC' },
      });

      const nextCursor = results.length
        ? results[results.length - 1].id.toString()
        : null;
      const previousCursor = results.length ? results[0].id.toString() : null;

      const hasNext = nextCursor
        ? (await this.getCount({
            where: { word: MoreThan(results[results.length - 1].word) },
          })) > 0
        : false;
      const hasPrev = previousCursor
        ? (await this.getCount({
            where: { word: LessThan(results[0].word) },
          })) > 0
        : false;

      cachedResult = {
        results: results.map((item) => item.word),
        totalDocs: await this.getCount(),
        previous: previousCursor,
        next: nextCursor,
        hasNext,
        hasPrev,
      };

      await this.cacheService.set(cachedResult, cacheKey);
    }

    return cachedResult;
  }

  async addWordToHistory(dictionary: Dictionary, userId: string) {
    const user = await this.userService.findUserById(userId);
    await this.historyService.addWordToUserHistory(dictionary, user);
  }

  async findOne(word: string, userId: string): Promise<Dictionary> {
    const cacheKey = `dictionary:${word}:${userId}`;
    const cachedDictionary = await this.cacheService.get<Dictionary>(cacheKey);

    if (cachedDictionary) {
      const { id, createdAt, word } = cachedDictionary;
      this.addWordToHistory({ id, createdAt, word }, userId);
      return cachedDictionary;
    }

    const dictionary = await this.dictionaryRepository.findOne({
      where: { word },
    });

    if (!dictionary) {
      throw new NotFoundException(`Word ${word} not found.`);
    }

    this.addWordToHistory(dictionary, userId);
    const wordDetails = await this.findWordFromExternalApi(word);

    const result = {
      id: dictionary.id,
      createdAt: dictionary.createdAt,
      word: dictionary.word,
      ...wordDetails,
    };
    await this.cacheService.set(result, cacheKey);
    await this.cacheService.del(`userHistory:${userId}`);
    return result;
  }

  async addWordToUserFavorites(word: string, userId: string): Promise<void> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: { word },
    });

    if (!dictionary) {
      throw new NotFoundException(`Word ${word} not found.`);
    }
    const user = await this.userService.findUserById(userId);
    await this.cacheService.del(`userFavorites:${userId}`);

    return this.favoriteService.addWordToUserFavorites(dictionary, user);
  }

  async removeWordFromUserFavorites(
    word: string,
    userId: string,
  ): Promise<void> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: { word },
    });

    if (!dictionary) {
      throw new NotFoundException(`Word ${word} not found.`);
    }
    const user = await this.userService.findUserById(userId);
    await this.cacheService.del(`userFavorites:${userId}`);

    return this.favoriteService.removeWordFromUserFavorites(dictionary, user);
  }
}
