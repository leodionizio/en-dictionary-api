import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { authMock } from './auth.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signin', () => {
    it('should return a valid token for valid user credentials', async () => {
      jest.spyOn(userService, 'validateUser').mockResolvedValue(authMock.user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(authMock.token);

      const result = await authService.signin(authMock.signin.request);

      expect(result.token).toBe(authMock.token);
      expect(result.email).toBe(authMock.user.email);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

      try {
        await authService.signin(authMock.signin.invalidRequest);
      } catch (error) {
        expect(error.response.message).toBe('Invalid email or password');
      }
    });
  });

  describe('signup', () => {
    it('should create a new user and return token', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(authMock.user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(authMock.token);

      const result = await authService.signup(authMock.signup.request);

      expect(result.token).toBe(authMock.token);
      expect(result.name).toBe(authMock.user.name);
      expect(result.id).toBe(authMock.user.id);
    });

    it('should throw an error if user creation fails', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new Error('User creation failed'));

      try {
        await authService.signup(authMock.signup.request);
      } catch (error) {
        expect(error.message).toBe('User creation failed');
      }
    });

    it('should throw an error if JWT signing fails', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(authMock.user);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error('JWT signing failed');
      });

      try {
        await authService.signup(authMock.signup.request);
      } catch (error) {
        expect(error.message).toBe('JWT signing failed');
      }
    });

    // it('should throw an error if email is already taken', async () => {
    //   jest.spyOn(userService, 'createUser').mockResolvedValue(null);

    //   try {
    //     await authService.signup(authMock.signup.request);
    //   } catch (error) {
    //     expect(error.message).toBe('Email is already taken');
    //   }
    // });

    // it('should throw validation error if request data is invalid', async () => {
    //   const invalidRequest = {
    //     ...authMock.signup.request,
    //     email: 'invalidEmail',
    //   };
    //   try {
    //     await authService.signup(invalidRequest);
    //   } catch (error) {
    //     expect(error.response.message).toContain('email must be an email');
    //   }
    // });
  });
});
