import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { AuthGuard } from '../../src/auth/auth.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../../src/user/user.entity';
import { userMock } from './user.mock';
import { HistoryService } from '../../src/history/history.service';
import { FavoriteService } from '../../src/favorite/favorite.service';
import { CacheService } from '../../src/cache/cache.service';
import { History } from '../../src/history/history.entity';
import { Favorite } from '../../src/favorite/favorite.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        HistoryService,
        FavoriteService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(History),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Favorite),
          useValue: {},
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getMe', () => {
    it('should return the current user data', async () => {
      const mockReq = { user: { id: '1' } };

      jest.spyOn(userService, 'findUserById').mockResolvedValue(userMock.user);

      const result = await userController.getMe(mockReq);

      expect(result).toEqual(
        plainToClass(User, userMock.user, { excludeExtraneousValues: true }),
      );
      expect(userService.findUserById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user is not found', async () => {
      const mockReq = { user: { id: '2' } };

      jest.spyOn(userService, 'findUserById').mockResolvedValue(null);

      try {
        await userController.getMe(mockReq);
      } catch (error) {
        expect(error.response.message).toBe('User not found');
      }
    });
  });

  describe('getUserHistory', () => {
    it('should return the user history', async () => {
      const mockReq = { user: { id: '1' } };

      jest
        .spyOn(userService, 'findUserHistory')
        .mockResolvedValue(userMock.history);

      const result = await userController.getUserHistory(mockReq);

      expect(result).toEqual(userMock.history);
      expect(userService.findUserHistory).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user history is not found', async () => {
      const mockReq = { user: { id: '3' } };

      jest.spyOn(userService, 'findUserHistory').mockResolvedValue(null);

      try {
        await userController.getUserHistory(mockReq);
      } catch (error) {
        expect(error.response.message).toBe('User history not found');
      }
    });
  });

  describe('getUserFavorites', () => {
    it('should return the user favorites', async () => {
      const mockReq = { user: { id: '1' } };

      jest
        .spyOn(userService, 'findUserFavorites')
        .mockResolvedValue(userMock.favorites);

      const result = await userController.getUserFavorites(mockReq);

      expect(result).toEqual(userMock.favorites);
      expect(userService.findUserFavorites).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user favorites are not found', async () => {
      const mockReq = { user: { id: '2' } };

      jest.spyOn(userService, 'findUserFavorites').mockResolvedValue(null);

      try {
        await userController.getUserFavorites(mockReq);
      } catch (error) {
        expect(error.response.message).toBe('User favorites not found');
      }
    });
  });
});
