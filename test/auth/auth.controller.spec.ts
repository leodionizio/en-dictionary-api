import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { authMock } from './auth.mock';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            signup: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('should return token when credentials are valid', async () => {
      (authService.signin as jest.Mock).mockResolvedValue(
        authMock.signin.response,
      );

      expect(await authController.signin(authMock.signin.request)).toEqual(
        authMock.signin.response,
      );
    });

    it('should throw BadRequestException when credentials are invalid', async () => {
      (authService.signin as jest.Mock).mockRejectedValue(
        new BadRequestException('Invalid email or password'),
      );

      await expect(
        authController.signin(authMock.signin.invalidRequest),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('signup', () => {
    it('should return new user with token', async () => {
      (authService.signup as jest.Mock).mockResolvedValue(
        authMock.signup.response,
      );

      expect(await authController.signup(authMock.signup.request)).toEqual(
        authMock.signup.response,
      );
    });

    it('should throw BadRequestException when signup data is invalid', async () => {
      (authService.signup as jest.Mock).mockRejectedValue(
        new BadRequestException([
          'name should not be empty',
          'name must be a string',
          'email must be an email',
          'password should not be empty',
        ]),
      );

      await expect(
        authController.signup(authMock.signup.invalidRequest),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
