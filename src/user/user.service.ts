/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HistoryService } from '../history/history.service';
import { UserWordsAddedResponseDto } from './dto/user-words-added.dto';
import { FavoriteService } from '../favorite/favorite.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly historyService: HistoryService,
    private readonly favoriteService: FavoriteService,
    private readonly cacheService: CacheService,
  ) {}

  async findUserById(id: string): Promise<User | undefined> {
    const cacheKey = `user:${id}`;
    const userCache = await this.cacheService.get<User>(cacheKey);

    if (userCache) return userCache;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.cacheService.set(user, cacheKey);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(`Couldn't to register user`);
    }
  }

  async findUserHistory(id: string): Promise<UserWordsAddedResponseDto> {
    const cacheKey = `userHistory:${id}`;
    const historyCache =
      await this.cacheService.get<UserWordsAddedResponseDto>(cacheKey);
    if (historyCache) return historyCache;

    const history = await this.historyService.findHistoryByUserId(id);
    const result = {
      results: history.map((histItem) => ({
        word: histItem.dictionary.word,
        added: histItem.createdAt,
      })),
    };
    await this.cacheService.set(result, cacheKey);
    return result;
  }

  async findUserFavorites(id: string): Promise<UserWordsAddedResponseDto> {
    const cacheKey = `userFavorites:${id}`;
    const favoritesCache =
      await this.cacheService.get<UserWordsAddedResponseDto>(cacheKey);
    if (favoritesCache) return favoritesCache;

    const favorites = await this.favoriteService.findFavoritesByUserId(id);

    const result = {
      results: favorites.map((favorite) => ({
        word: favorite.dictionary.word,
        added: favorite.createdAt,
      })),
    };
    await this.cacheService.set(result, cacheKey);
    return result;
  }
}
