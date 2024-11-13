import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';
import { HistoryService } from '../../src/history/history.service';
import { FavoriteService } from '../../src/favorite/favorite.service';
import { CacheService } from '../../src/cache/cache.service';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { userMock } from './user.mock';

describe('UserService', () => {
  let userService: UserService;
  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockHistoryService = {
    findHistoryByUserId: jest.fn(),
  };

  const mockFavoriteService = {
    findFavoritesByUserId: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: HistoryService,
          useValue: mockHistoryService,
        },
        {
          provide: FavoriteService,
          useValue: mockFavoriteService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('findUserById', () => {
    it('should return user from cache if exists', async () => {
      const userId = '1';
      mockCacheService.get.mockResolvedValue(userMock.user);
      const result = await userService.findUserById(userId);

      expect(result).toEqual(userMock.user);
      expect(mockCacheService.get).toHaveBeenCalledWith(`user:${userId}`);
    });

    it('should return user from DB and cache it if not in cache', async () => {
      const userId = '1';
      mockCacheService.get.mockResolvedValue(null);
      mockUserRepository.findOne.mockResolvedValue(userMock.user);
      const result = await userService.findUserById(userId);

      expect(result).toEqual(userMock.user);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        userMock.user,
        `user:${userId}`,
      );
    });

    it('should throw NotFoundException if user not found in DB', async () => {
      const userId = '1';

      mockCacheService.get.mockResolvedValue(null);
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(userService.findUserById(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const hashedPassword = await bcrypt.hash(
        userMock.createUser.password,
        10,
      );
      const mockNewUser = { ...userMock.createUser, password: hashedPassword };

      mockUserRepository.create.mockReturnValue(mockNewUser);
      mockUserRepository.save.mockResolvedValue(mockNewUser);

      const result = await userService.createUser(userMock.createUser);

      expect(result).toEqual(mockNewUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockNewUser);
    });

    it('should throw BadRequestException if an error occurs while creating a user', async () => {
      mockUserRepository.create.mockReturnValue(userMock.createUser);
      mockUserRepository.save.mockRejectedValue(
        new BadRequestException(`Couldn't to register user`),
      );

      await expect(userService.createUser(userMock.createUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findUserHistory', () => {
    it('should return user history from cache if exists', async () => {
      const userId = '1';
      mockCacheService.get.mockResolvedValue(userMock.history);
      const result = await userService.findUserHistory(userId);

      expect(result).toEqual(userMock.history);
      expect(mockCacheService.get).toHaveBeenCalledWith(
        `userHistory:${userId}`,
      );
    });

    it('should return user history from DB and cache it if not in cache', async () => {
      const userId = '1';
      mockCacheService.get.mockResolvedValue(null);
      mockHistoryService.findHistoryByUserId.mockResolvedValue(
        userMock.historyDictionary,
      );

      const result = await userService.findUserHistory(userId);

      expect(result).toEqual(userMock.history);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        userMock.history,
        `userHistory:${userId}`,
      );
    });
  });

  describe('findUserFavorites', () => {
    it('should return user favorites from cache if exists', async () => {
      const userId = '1';

      mockCacheService.get.mockResolvedValue(userMock.favorites);

      const result = await userService.findUserFavorites(userId);

      expect(result).toEqual(userMock.favorites);
      expect(mockCacheService.get).toHaveBeenCalledWith(
        `userFavorites:${userId}`,
      );
    });

    it('should return user favorites from DB and cache it if not in cache', async () => {
      const userId = '1';

      mockCacheService.get.mockResolvedValue(null);
      mockFavoriteService.findFavoritesByUserId.mockResolvedValue(
        userMock.favoritesDictionary,
      );

      const result = await userService.findUserFavorites(userId);

      expect(result).toEqual(userMock.favorites);
      expect(mockCacheService.set).toHaveBeenCalledWith(
        userMock.favorites,
        `userFavorites:${userId}`,
      );
    });
  });
});
