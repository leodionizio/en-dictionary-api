import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { SigninDto, SigninResponseDto } from '../../src/auth/dto/signin.dto';
import { SignupResponseDto } from '../../src/auth/dto/signup.dto';
import { User } from '../../src/user/user.entity';

export type AuthMock = {
  signin: {
    request: SigninDto;
    invalidRequest: SigninDto;
    response: SigninResponseDto;
  };
  signup: {
    request: CreateUserDto;
    invalidRequest: any;
    response: SignupResponseDto;
  };
  user: User;
  token: string;
};

export const authMock: AuthMock = {
  signin: {
    request: {
      email: 'fulano7765@gmail.com',
      password: 'ef47as',
    },
    invalidRequest: {
      email: 'fulano7765@gmail.com',
      password: '1',
    },
    response: {
      email: 'fulano7765@gmail.com',
      token: 'exjs45token',
    },
  },
  signup: {
    request: {
      name: 'Fulano Sinclano',
      email: 'fulano7765@gmail.com',
      password: 'ef47as',
    },
    invalidRequest: {
      fullname: 'Fulaninho',
      password: '',
      email: 'email',
    },
    response: {
      id: '1',
      name: 'Fulano Sinclano',
      token: 'exjs45token',
    },
  },
  user: {
    id: '1',
    name: 'Ciclano Fulano',
    email: 'ciclano@gmail.com',
    password: '67asd78',
    createdAt: new Date(),
  },
  token: 'mock-token-123456',
};
